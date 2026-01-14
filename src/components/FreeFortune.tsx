'use client';

import { useState } from 'react';
import styles from './FreeFortune.module.css';

interface Pillar {
    kanji: string;
    element: string;
}

interface FourPillars {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
}

interface FortuneResult {
    theme: string;
    pillars: FourPillars;
    personality: string;
    destiny: string;
}

export default function FreeFortune() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('1995');
    const [month, setMonth] = useState('6');
    const [day, setDay] = useState('15');
    const [birthTime, setBirthTime] = useState(''); // Changed to string for time input
    const [gender, setGender] = useState('female');
    const [result, setResult] = useState<FortuneResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate calculation time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Parse hour from birthTime string (e.g. "14:30"), default to 12
        let hourValue = 12;
        if (birthTime) {
            const parts = birthTime.split(':');
            if (parts.length > 0) {
                hourValue = parseInt(parts[0], 10);
            }
        }

        // Deterministic mock calculation based on input
        const seed = name.length + parseInt(year) + parseInt(month) + parseInt(day) + hourValue;
        const elements = ['木', '火', '土', '金', '水'];
        const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        const getPillar = (offset: number): Pillar => ({
            kanji: stems[(seed + offset) % 10] + branches[(seed + offset) % 12],
            element: elements[(seed + offset) % 5]
        });

        setResult({
            theme: ['「創造と革新」', '「調和と安定」', '「挑戦と開拓」', '「知恵と探求」', '「愛と奉仕」'][seed % 5],
            pillars: {
                year: getPillar(0),
                month: getPillar(1),
                day: getPillar(2),
                hour: getPillar(3)
            },
            personality: `あなたは生まれながらにして${elements[seed % 5]}の性質を強く持っています。${['情熱的で、周囲を巻き込む力を持っています。', '冷静沈着で、物事の本質を見抜く力があります。', '優しさに溢れ、多くの人から愛される存在です。'][seed % 3]}`,
            destiny: `あなたの人生における大きなテーマは${['自己実現', '社会貢献', '家庭の幸福', '真理の探究'][seed % 4]}です。運命の羅針盤は、${parseInt(year) + 30}年頃に大きな転機が訪れることを示しています。`
        });
        setIsLoading(false);
    };

    if (result) {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <div className={styles.icon}>🔮</div>
                    <h3 className={styles.resultTitle}>鑑定結果</h3>
                    <p className={styles.subtitle}>{name} 様の運命図</p>
                </div>

                <div className={styles.themeBox}>
                    <span className={styles.themeLabel}>あなたの人生のテーマ</span>
                    <div className={styles.themeValue}>{result.theme}</div>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 四柱推命命式 ✧</h4>
                    <div className={styles.pillarsGrid}>
                        <div className={styles.pillarItem}>
                            <span className={styles.pillarLabel}>年柱</span>
                            <div className={styles.pillarValue}>
                                <span>{result.pillars.year.kanji.charAt(0)}</span>
                                <span>{result.pillars.year.kanji.charAt(1)}</span>
                            </div>
                        </div>
                        <div className={styles.pillarItem}>
                            <span className={styles.pillarLabel}>月柱</span>
                            <div className={styles.pillarValue}>
                                <span>{result.pillars.month.kanji.charAt(0)}</span>
                                <span>{result.pillars.month.kanji.charAt(1)}</span>
                            </div>
                        </div>
                        <div className={styles.pillarItem}>
                            <span className={styles.pillarLabel}>日柱</span>
                            <div className={styles.pillarValue}>
                                <span>{result.pillars.day.kanji.charAt(0)}</span>
                                <span>{result.pillars.day.kanji.charAt(1)}</span>
                            </div>
                        </div>
                        <div className={styles.pillarItem}>
                            <span className={styles.pillarLabel}>時柱</span>
                            <div className={styles.pillarValue}>
                                <span>{result.pillars.hour.kanji.charAt(0)}</span>
                                <span>{result.pillars.hour.kanji.charAt(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 本質と性格 ✧</h4>
                    <p className={styles.detailText}>{result.personality}</p>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 運命の道筋 ✧</h4>
                    <p className={styles.detailText}>{result.destiny}</p>
                </div>

                <button onClick={() => setResult(null)} className={styles.retryButton}>
                    もう一度占う
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.icon}>✨</div>
                <h2 className={styles.title}>無料総合鑑定</h2>
                <p className={styles.subtitle}>四柱推命と独自占術であなたの運命を紐解きます</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>お名前</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="月詠 ルナ"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>生年月日</label>
                    <div className={styles.dateRow}>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className={styles.select}
                        >
                            {years.map(y => <option key={y} value={y}>{y}年</option>)}
                        </select>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className={styles.select}
                        >
                            {months.map(m => <option key={m} value={m}>{m}月</option>)}
                        </select>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className={styles.select}
                        >
                            {days.map(d => <option key={d} value={d}>{d}日</option>)}
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>出生時間（分かれば）</label>
                    <div className={styles.timeRow}>
                        <input
                            type="time"
                            className={styles.input}
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                        />
                    </div>
                    <p className={styles.timeNote}>※不明な場合は正午として計算します</p>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>性別</label>
                    <div className={styles.genderGroup}>
                        <button
                            type="button"
                            className={`${styles.genderOption} ${gender === 'female' ? styles.selected : ''}`}
                            onClick={() => setGender('female')}
                        >
                            女性
                        </button>
                        <button
                            type="button"
                            className={`${styles.genderOption} ${gender === 'male' ? styles.selected : ''}`}
                            onClick={() => setGender('male')}
                        >
                            男性
                        </button>
                        <button
                            type="button"
                            className={`${styles.genderOption} ${gender === 'other' ? styles.selected : ''}`}
                            onClick={() => setGender('other')}
                        >
                            その他
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !name}
                    className={styles.submitButton}
                >
                    {isLoading ? (
                        <div className={styles.loading}>
                            <span className={styles.loadingDot}>✧</span>
                            <span>星を読み解いています...</span>
                            <span className={styles.loadingDot}>✧</span>
                        </div>
                    ) : '無料で鑑定する'}
                </button>
            </form>
        </div>
    );
}
