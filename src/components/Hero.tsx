import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.backgroundOverlay} />

            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/luna.png"
                        alt="月詠ルナ"
                        width={320}
                        height={320}
                        className={styles.image}
                        priority
                    />
                    <div className={styles.imageGlow} />
                </div>

                <div className={styles.textContent}>
                    <p className={styles.subtitle}>神秘の月光に導かれし占い師</p>
                    <h1 className={styles.name}>月詠ルナ</h1>
                    <div className={styles.titleBox}>
                        <span className={styles.title}>月光占術</span>
                    </div>
                    <p className={styles.catchphrase}>
                        月と星の導きで、あなたの運命を照らします
                    </p>
                    <div className={styles.badges}>
                        <span className={styles.badge}>✧ 四柱推命</span>
                        <span className={styles.badge}>✧ 西洋占星術</span>
                        <span className={styles.badge}>✧ タロット</span>
                    </div>
                </div>
            </div>

            <div className={styles.scrollHint}>
                <span>無料鑑定はこちら</span>
                <div className={styles.scrollArrow}>↓</div>
            </div>
        </section>
    );
}
