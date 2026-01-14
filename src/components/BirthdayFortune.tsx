'use client';

import { useState } from 'react';
import styles from './BirthdayFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface BirthdayResult {
    birthNumber: number;
    personality: string;
    loveTendency: string;
    luckyWord: string;
}

export default function BirthdayFortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1995', month: '1', day: '1' });
    const [result, setResult] = useState<BirthdayResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculateBirthNumber = (y: string, m: string, d: string): number => {
        // 誕生数計算（各桁を足し合わせ、1桁になるまで足す。11, 22はそのままなど流派があるがここでは1-9に集約）
        const str = `${y}${m}${d}`;
        let sum = 0;
        for (const char of str) {
            sum += parseInt(char);
        }

        while (sum > 9) {
            let tempSum = 0;
            const tempStr = sum.toString();
            for (const char of tempStr) {
                tempSum += parseInt(char);
            }
            sum = tempSum;
        }
        return sum;
    }

    const getFortune = (num: number): BirthdayResult => {
        const data: Record<number, Omit<BirthdayResult, 'birthNumber'>> = {
            1: {
                personality: "リーダーシップがあり、パワフルで情熱的。新しい道を切り開く開拓者タイプ。",
                loveTendency: "好きになったら一直線。情熱的なアプローチをし、相手をリードします。",
                luckyWord: "「私はできる」"
            },
            2: {
                personality: "協調性があり、繊細で心優しい平和主義者。人の気持ちを察するのが得意なサポーター。",
                loveTendency: "相手に尽くすタイプ。細やかな気遣いでパートナーを癒やします。",
                luckyWord: "「ありがとう」"
            },
            3: {
                personality: "無邪気で明るく、創造力豊か。人生を楽しむ達人で、周囲を笑顔にするエンターテイナー。",
                loveTendency: "楽しいことが大好き。友達のような関係から恋に発展することが多いです。",
                luckyWord: "「楽しいね」"
            },
            4: {
                personality: "真面目で誠実、コツコツと努力を積み重ねる堅実家。ルールや秩序を大切にする安定志向。",
                loveTendency: "慎重に愛を育みます。信頼関係を何よりも大切にし、結婚を前提とした付き合いを好みます。",
                luckyWord: "「大丈夫」"
            },
            5: {
                personality: "自由を愛する冒険家。変化と刺激を求め、行動力抜群。コミュニケーション能力も高い。",
                loveTendency: "束縛を嫌い、お互いに自由でいられる関係を望みます。ドラマチックな恋愛を好む傾向も。",
                luckyWord: "「自由」"
            },
            6: {
                personality: "愛情深く、責任感が強い博愛主義者。美と調和を愛し、人の役に立つことに喜びを感じる。",
                loveTendency: "ロマンチストで家庭的。結婚願望が強く、温かい家庭を築くことを夢見ます。",
                luckyWord: "「愛してる」"
            },
            7: {
                personality: "知的で冷静、独自の哲学を持つ探究者。一人の時間を大切にし、精神的な豊かさを求める。",
                loveTendency: "精神的な繋がりを重視します。ベタベタした関係よりも、自立した大人の付き合いを好みます。",
                luckyWord: "「なぜ？」"
            },
            8: {
                personality: "野心家でエネルギッシュ、目標達成能力が高い実力者。困難にも負けない強い精神力を持つ。",
                loveTendency: "情熱的で支配欲が少し強め。リッチなデートやプレゼントを好む傾向があります。",
                luckyWord: "「成功」"
            },
            9: {
                personality: "感受性が強く、ロマンチスト。理想が高く、世の中のために貢献したいと願う理想主義者。",
                loveTendency: "献身的で包容力があります。相手の全てを受け入れようとする海のような愛を持っています。",
                luckyWord: "「許す」"
            }
        };

        return { birthNumber: num, ...data[num] };
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!person.name) {
            handlePersonChange('name', 'Guest');
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const bn = calculateBirthNumber(person.year, person.month, person.day);
        const res = getFortune(bn);
        setResult(res);
        setIsLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setPerson({ name: '', year: '1995', month: '1', day: '1' });
    };

    if (result) {
        return (
            <div className={styles.container}>
                <div className={styles.resultContainer}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 className={styles.title}>🎂 誕生日占い結果 🎂</h3>
                        <p className={styles.subtitle}>{person.name}様の運命数</p>
                        <div className={styles.numberBox}>
                            <span className={styles.numberLabel}>BIRTH NUMBER</span>
                            <span className={styles.numberValue}>{result.birthNumber}</span>
                        </div>
                    </div>

                    <div className={styles.detailBox}>
                        <h4 className={styles.detailTitle}>✧ 性格と運命</h4>
                        <p className={styles.detailText}>{result.personality}</p>
                    </div>

                    <div className={styles.detailBox}>
                        <h4 className={styles.detailTitle}>♡ 恋愛傾向</h4>
                        <p className={styles.detailText}>{result.loveTendency}</p>
                    </div>

                    <div className={styles.detailBox}>
                        <h4 className={styles.detailTitle}>✨ 魔法の言葉</h4>
                        <p className={styles.detailText} style={{ textAlign: 'center', fontSize: '1.2rem', color: '#fff' }}>{result.luckyWord}</p>
                    </div>

                    <button onClick={resetForm} className={styles.retryButton}>
                        もう一度占う
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>☆</span>
                <h3 className={styles.title}>誕生日占い</h3>
                <p className={styles.subtitle}>生年月日から導き出す運命数で、<br />あなたの本質と恋愛傾向を占います</p>
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

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loading}>
                            <span className={styles.loadingDot}>☆</span>
                            運命数を算出しています
                            <span className={styles.loadingDot}>☆</span>
                        </span>
                    ) : (
                        '無料で占う'
                    )}
                </button>
            </form>
        </div>
    );
}
