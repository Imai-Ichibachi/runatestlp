import Hero from "@/components/Hero";
import FortuneMenu from "@/components/FortuneMenu";
import Profile from "@/components/Profile";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />

      <section id="fortune" className={styles.fortuneSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleDecor}>✧</span>
            無料鑑定
            <span className={styles.titleDecor}>✧</span>
          </h2>

          <div className={styles.fortuneCard}>
            <div className="text-center">
              <p className={styles.fortuneDescription}>
                四柱推命と月光占術を組み合わせた<br />
                月詠ルナオリジナルの特別鑑定。<br />
                <span className="text-sm text-purple-300 mt-2 block">あなたの人生のテーマと運命を紐解きます</span>
              </p>

              {/* Luxury Button */}
              <div className="mt-8">
                <Link
                  href="/fortune"
                  className={styles.startFortuneButton}
                >
                  ✦ 今すぐ鑑定する ✦
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu">
        <FortuneMenu />
      </section>

      <section id="profile">
        <Profile />
      </section>
    </div>
  );
}
