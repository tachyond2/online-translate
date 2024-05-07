// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Button from './Button'
import BackButton from './BackButton'

import styles from './Form.module.css'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Message from './Message'
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {
  const [lat, lng] = useUrlPosition()
  const { createCity, isLoading } = useCities()
  const navigate = useNavigate()

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [emoji, setEmoji] = useState('')
  const [geocodingError, setGeocodingError] = useState('')

  const [target, setTarget] = useState('zh')

  let translatedText = ''

  useEffect(
    function () {
      if (!lat && !lng) return

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true)
          setGeocodingError('')

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          )
          const data = await res.json()
          console.log(data)

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            )

          setCityName(data.city || data.locality || '')
          setCountry(data.countryName)
          setEmoji(convertToEmoji(data.countryCode))
        } catch (err) {
          setGeocodingError(err.message)
        } finally {
          setIsLoadingGeocoding(false)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  async function handleSubmit(e) {
    e.preventDefault()

    if (!cityName || !target) return

    try {
      const res = await fetch(
        `http://localhost:8000/api?text=${notes}&target=${target}`
      )
      const data = await res.json()
      console.log(data.TargetText)
      translatedText = data.TargetText
    } catch (err) {
      console.log(err.message)
    }
    console.log(translatedText)

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      translatedText,
    }

    await createCity(newCity)
    navigate('/app/cities')
  }

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">待翻译的文本的语言是?</label>
        <input
          id="cityName"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="target">你想翻译成什么语言?</label>

        <input
          id="target"
          onChange={(e) => setTarget(e.target.value === '汉语' ? 'zh' : 'en')}
          value={target === 'zh' ? '汉语' : '英语'}
        />
        <span className={styles.flag}>{target === 'zh' ? '🇨🇳' : '🇬🇧'}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">请输入待翻译的文本</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
