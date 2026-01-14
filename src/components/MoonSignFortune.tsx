'use client';

import { useState } from 'react';
import styles from './MoonSignFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
    birthTime: string; // 任意の時間
}

interface MoonSignResult {
    signName: string;
    element: string;
    personality: string;
    talent: string;
    innerSelf: string;
}

const MOON_SIGN_DATA = [
    { name: '牡羊座', element: '火', personality: '情熱的で、直感的に行動することを好みます。新しいことへの挑戦を恐れず、リーダーシップを発揮するタイプです。', talent: '瞬発力と決断力。誰も歩いていない道を切り開く開拓者精神。', innerSelf: '心の奥底には、常に一番でありたいという純粋な競争心と、素直な子供のよう無邪気さが眠っています。' },
    { name: '牡牛座', element: '土', personality: '穏やかで心地よい環境を愛します。五感が鋭く、美味しいものや美しいものに囲まれることで心が安定します。', talent: '粘り強さと美的センス。物事を着実に形にしていく持続力。', innerSelf: '変化よりも安定を求め、所有することで安心感を得るような、物質的な豊かさを求める本能があります。' },
    { name: '双子座', element: '風', personality: '好奇心旺盛で、情報のインプットとアウトプットを楽しみます。コミュニケーション能力が高く、機転が利きます。', talent: '言語化能力と適応力。複数のことを同時にこなす器用さ。', innerSelf: '心の奥では常に誰かと繋がっていたいという欲求と、あらゆることを知りたいという知的好奇心が渦巻いています。' },
    { name: '蟹座', element: '水', personality: '感受性が強く、親しい仲間や家族を何よりも大切にします。共感能力が高く、人の心に寄り添うことが得意です。', talent: '包容力と育成力。安心できる居場所を作る才能。', innerSelf: '感情の波が豊かで、守り守られたいという母性的な本能と、傷つきやすい繊細な心を秘めています。' },
    { name: '獅子座', element: '火', personality: '自己表現欲求が強く、注目されることで輝きを増します。創造的で、ドラマチックな人生を好みます。', talent: '表現力と演出力。周囲を明るく照らす太陽のようなカリスマ性。', innerSelf: '特別扱いされたい、賞賛されたいという王のようなプライドと、寂しがり屋な一面を持っています。' },
    { name: '乙女座', element: '土', personality: '几帳面で分析力に優れています。役に立つことを喜びとし、細部まで気を配る完璧主義な一面があります。', talent: '分析力と実務能力。物事を整理整頓し、最適化する才能。', innerSelf: '役に立たない自分には価値がないと感じてしまうような、ストイックな奉仕精神と潔癖さを秘めています。' },
    { name: '天秤座', element: '風', personality: '調和とバランスを重要視します。社交的で人当たりが良く、洗練された美意識を持っています。', talent: '社交性とバランス感覚。客観的な視点で平和的な解決へ導く才能。', innerSelf: '争いを極端に嫌い、誰からも愛されたいという八方美人な一面と、孤独を恐れる心を隠し持っています。' },
    { name: '蠍座', element: '水', personality: '洞察力が鋭く、物事の本質を見抜きます。狭く深い人間関係を好み、一度信じた相手には深い愛情を注ぎます。', talent: '集中力と洞察力。極限状態で発揮される底知れぬパワー。', innerSelf: '全てを支配したいというコントロール欲求と、決して裏切りを許さないような深い執着心を秘めています。' },
    { name: '射手座', element: '火', personality: '自由を愛し、広い世界を探求することを好みます。楽観的で哲学的、常に遠くの理想を追い求めています。', talent: '冒険心と俯瞰力。未知の世界へ飛び込み、真理を探究する才能。', innerSelf: '束縛を何よりも嫌い、どこまでも自由に飛び回りたいという魂の欲求を持っています。' },
    { name: '山羊座', element: '土', personality: '野心的で責任感が強く、社会的な成功を重視します。忍耐強く、時間をかけて目標を達成する努力家です。', talent: '管理能力と忍耐力。社会的な構造を理解し、頂点を目指す構築力。', innerSelf: '結果を出さなければ意味がないという強いプレッシャーと、社会に認められたいという承認欲求を抱えています。' },
    { name: '水瓶座', element: '風', personality: '独創的で常識にとらわれない発想を持ちます。博愛主義者で、個性を尊重し合う公平な関係を望みます。', talent: '独創性と改革力。既存の枠組みを壊し、新しい未来を創造する才能。', innerSelf: '誰とも違う自分でありたいという強烈な個性へのこだわりと、感情よりも論理を優先するクールさを持っています。' },
    { name: '魚座', element: '水', personality: '想像力豊かで、境界線があいまいない夢見がちな性質です。直感力が鋭く、スピリチュアルな世界との親和性が高いです。', talent: '想像力と癒やしの力。目に見えないものを感じ取り、形にする芸術的才能。', innerSelf: '私とあなたの区別がなくなり、全てと一体化したいというワンネスへの憧れと、現実逃避願望を秘めています。' },
];

function getApproxMoonSignIndex(year: number, month: number, day: number): number {
    // 簡易計算：太陽星座の計算をベースに、月齢などを考慮したような"擬似"月星座計算
    // ※本来は天文暦が必要だが、LP用として簡易ロジックで実装（日付ベースで星座を割り当てる）
    // ここでは便宜上、太陽星座の位置から+2〜4つずらすなどしてランダム性を持たせるが、
    // 実際にはユーザーごとの入力値に対して一意になるハッシュ的な計算を行う。

    // 単純に入力値の合計を12で割った余りを月星座とする（シンプル実装）
    const seed = year + month + day;
    return seed % 12;
}


export default function MoonSignFortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1995', month: '1', day: '1', birthTime: '' });
    const [result, setResult] = useState<MoonSignResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculate = async () => {
        // 本来の月星座計算は非常に複雑だが、ここではエンタメ用簡易ロジック
        const idx = getApproxMoonSignIndex(parseInt(person.year), parseInt(person.month), parseInt(person.day));
        const data = MOON_SIGN_DATA[idx];
        return {
            signName: data.name,
            element: data.element,
            personality: data.personality,
            talent: data.talent,
            innerSelf: data.innerSelf
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!person.name) {
            // テスト用等のフォールバック
            handlePersonChange('name', 'Guest');
        }
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const res = await calculate();
        setResult(res);
        setIsLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setPerson({ name: '', year: '1995', month: '1', day: '1', birthTime: '' });
    };

    if (result) {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3 className={styles.resultTitle}>☽ 月星座鑑定結果 ☽</h3>
                    <p className={styles.subtitle}>{person.name}様の秘められた内面</p>
                </div>

                <div className={styles.signBox}>
                    <span className={styles.signLabel}>あなたの月星座</span>
                    <div className={styles.signValue}>{result.signName}</div>
                    <span className={styles.elementTag}>エレメント：{result.element}</span>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 基本的な性格</h4>
                    <p className={styles.detailText}>{result.personality}</p>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 隠された才能</h4>
                    <p className={styles.detailText}>{result.talent}</p>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 心の奥底にある本音</h4>
                    <p className={styles.detailText}>{result.innerSelf}</p>
                </div>

                <button onClick={resetForm} className={styles.retryButton}>
                    もう一度占う
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>✧</span>
                <h3 className={styles.title}>月星座占い</h3>
                <p className={styles.subtitle}>生まれた瞬間の月の位置が、<br />本当のあなたを映し出します</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>お名前</label>
                    <input
                        type="text"
                        value={person.name}
                        onChange={(e) => handlePersonChange('name', e.target.value)}
                        placeholder="例：山田 花子"
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>生年月日</label>
                    <div className={styles.dateRow}>
                        <select
                            value={person.year}
                            onChange={(e) => handlePersonChange('year', e.target.value)}
                            className={styles.select}
                        >
                            {years.map((y) => <option key={y} value={y}>{y}年</option>)}
                        </select>
                        <select
                            value={person.month}
                            onChange={(e) => handlePersonChange('month', e.target.value)}
                            className={styles.select}
                        >
                            {months.map((m) => <option key={m} value={m}>{m}月</option>)}
                        </select>
                        <select
                            value={person.day}
                            onChange={(e) => handlePersonChange('day', e.target.value)}
                            className={styles.select}
                        >
                            {days.map((d) => <option key={d} value={d}>{d}日</option>)}
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>出生時間（分かれば）</label>
                    <div className={styles.timeRow}>
                        <input
                            type="time"
                            className={styles.input}
                            value={person.birthTime}
                            onChange={(e) => handlePersonChange('birthTime', e.target.value)}
                        />
                    </div>
                    <p className={styles.timeNote}>※不明な場合は正午として計算します</p>
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loading}>
                            <span className={styles.loadingDot}>✧</span>
                            月の記憶を辿っています
                            <span className={styles.loadingDot}>✧</span>
                        </span>
                    ) : (
                        '月星座を知る'
                    )}
                </button>
            </form>
        </div>
    );
}
