import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>塞外后台</h2>
          <p>
            待开发中,敬请期待
          </p>
         
        </div>
      </section>
    </main>
  );
}
