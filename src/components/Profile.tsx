import styles from './Profile.module.css';

export default function Profile() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleDecor}>✧</span>
                    占い師紹介
                    <span className={styles.titleDecor}>✧</span>
                </h2>

                <div className={styles.profileCard}>
                    <div className={styles.header}>
                        <h3 className={styles.name}>月詠ルナ</h3>
                        <p className={styles.reading}>Tsukuyomi Luna</p>
                    </div>

                    <div className={styles.content}>
                        <p className={styles.intro}>
                            幼少期より月と星に魅せられ、その神秘的な力に導かれるように占いの道へ。
                            四柱推命を基礎としながら、西洋占星術やタロットを融合させた独自の
                            「月光占術」を確立しました。
                        </p>

                        <div className={styles.expertise}>
                            <h4 className={styles.expertiseTitle}>得意な占術</h4>
                            <ul className={styles.expertiseList}>
                                <li>
                                    <span className={styles.icon}>☽</span>
                                    <span className={styles.expertiseName}>月光占術</span>
                                    <span className={styles.expertiseDesc}>月の満ち欠けと生年月日から運命を読み解く独自の占術</span>
                                </li>
                                <li>
                                    <span className={styles.icon}>✧</span>
                                    <span className={styles.expertiseName}>四柱推命</span>
                                    <span className={styles.expertiseDesc}>生年月日時から人生の運命を詳細に鑑定</span>
                                </li>
                                <li>
                                    <span className={styles.icon}>☆</span>
                                    <span className={styles.expertiseName}>西洋占星術</span>
                                    <span className={styles.expertiseDesc}>ホロスコープから性格・相性・運勢を分析</span>
                                </li>
                                <li>
                                    <span className={styles.icon}>♠</span>
                                    <span className={styles.expertiseName}>タロット</span>
                                    <span className={styles.expertiseDesc}>カードの導きで現在の状況と未来の可能性を読む</span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.message}>
                            <h4 className={styles.messageTitle}>月詠ルナからのメッセージ</h4>
                            <blockquote className={styles.quote}>
                                「月は満ちては欠け、また満ちていきます。人生も同じ。
                                今がどんなに暗い夜でも、必ず光は訪れます。
                                私はあなたの心を照らす月明かりでありたい。
                                一緒に、あなたの輝く未来を見つけましょう。」
                            </blockquote>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>15</span>
                                <span className={styles.statLabel}>年以上の鑑定経験</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>30,000</span>
                                <span className={styles.statLabel}>人以上の鑑定実績</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>98</span>
                                <span className={styles.statLabel}>%の満足度</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
