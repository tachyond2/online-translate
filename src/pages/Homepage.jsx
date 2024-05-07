import { Link } from 'react-router-dom'
import PageNav from '../components/PageNav'
import styles from './Homepage.module.css'

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          塞外
          <br />
          在线翻译系统
        </h1>
        <h2>
          塞外在线翻译系统致力于打造一个翻译语言和文化的桥梁。我们深知不同语言之间的鸿沟有多么巨大,这不仅是词汇上的差异,更是思维模式和世界观念的差异。我们希望通过翻译,让更多人能够打破语言障碍,亲身体会不同语言的独特之美。
          在这个多语言的世界,翻译是相互理解的关键。塞外翻译系统将应用翻译前沿技术,提供流畅美观的翻译结果,传递语言的精髓。不仅翻译文本上的语言,更要翻译两种语言背后蕴含的文化内涵。
          在繁忙的工作学习中,塞外翻译系统让你随时随地体验语言的魅力。不管是商务文件、学术论文,还是海外社交,塞外都将为你提供专业可靠的翻译支持。
          加入塞外,用语言描绘世界,用翻译搭建桥梁。让我们一起打造一个多语言的大家庭,享受沟通和理解的乐趣。
        </h2>
        <Link to="/login" className="cta">
          开始探索之旅:)
        </Link>
      </section>
    </main>
  )
}
