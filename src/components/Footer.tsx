import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <span className={styles.logoIcon}>☽</span>
                    <span className={styles.logoText}>月詠ルナ</span>
                    <p className={styles.tagline}>月光占術 - あなたの運命を照らす占い</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>占いメニュー</h4>
                        <a href="#">2026年の運勢</a>
                        <a href="#">月星座占い</a>
                        <a href="#">相性占い</a>
                        <a href="#">今日の運勢</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>サービス</h4>
                        <a href="#">有料鑑定</a>
                        <a href="#">個人セッション</a>
                        <a href="#">月間占い</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>サポート</h4>
                        <a href="#">よくある質問</a>
                        <a href="#">お問い合わせ</a>
                        <a href="#">利用規約</a>
                        <a href="#">プライバシーポリシー</a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2026 月詠ルナ - 月光占術 All Rights Reserved.
                    </p>
                    <p className={styles.legal}>
                        ※ 本サイトの占い結果は娯楽目的のものであり、人生の重要な決断の唯一の根拠とすべきではありません。
                    </p>
                </div>
            </div>
        </footer>
    );
}
