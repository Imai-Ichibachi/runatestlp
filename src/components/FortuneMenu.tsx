import styles from './FortuneMenu.module.css';

const MENU_ITEMS = [
    {
        icon: '☽',
        title: '2026年の運勢',
        description: '月詠ルナが月光占術で占う、2026年あなたの運勢',
        tag: '人気',
        link: '/fortune2026',
    },
    {
        icon: '♡',
        title: '相性占い',
        description: '月星座で占う2人の恋愛相性・結婚相性',
        tag: null,
        link: '/affinity',
    },
    {
        icon: '✧',
        title: '月星座占い',
        description: '月星座から読み解くあなたの性格・才能・運命',
        tag: null,
        link: '/moonsign',
    },
    {
        icon: '☆',
        title: '誕生日占い',
        description: '生年月日から無料鑑定。あなたの性格・恋愛傾向',
        tag: '無料',
        link: '/birthday',
    },
    {
        icon: '💍',
        title: '結婚占い',
        description: 'あなたの結婚相手の特徴・出会い・結婚時期を特定',
        tag: null,
        link: '/marriage',
    },
    {
        icon: '💰',
        title: '金運占い',
        description: '2026年の金運・金運アップ法を無料鑑定',
        tag: '無料',
        link: '/money',
    },
    {
        icon: '📅',
        title: '今日の運勢',
        description: '月詠ルナが生年月日で占う毎日更新の無料占い',
        tag: '毎日更新',
        link: '/today',
    },
    {
        icon: '🔮',
        title: 'Yes/No占い',
        description: 'あなたの質問の答えはイエス？ノー？',
        tag: null,
        link: '/yesno',
    },
];

export default function FortuneMenu() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleDecor}>✧</span>
                    月詠ルナの人気占い
                    <span className={styles.titleDecor}>✧</span>
                </h2>

                <div className={styles.menuGrid}>
                    {MENU_ITEMS.map((item, index) => (
                        <a href={item.link || "#"} key={index} className={styles.menuItem}>
                            {item.tag && (
                                <span className={`${styles.tag} ${item.tag === '人気' ? styles.tagPopular : ''}`}>
                                    {item.tag}
                                </span>
                            )}
                            <span className={styles.icon}>{item.icon}</span>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <p className={styles.itemDesc}>{item.description}</p>
                        </a>
                    ))}
                </div>

                <div className={styles.moreLink}>
                    <a href="#" className={styles.moreLinkButton}>
                        もっと見る ⇒
                    </a>
                </div>
            </div>
        </section>
    );
}
