'use client';

import { useState } from 'react';
import styles from './Year2026Fortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface YearlyResult {
    theme: string;
    general: string;
    love: string;
    work: string;
    monthly: string[];
}

export default function Year2026Fortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1990', month: '1', day: '1' });
    const [result, setResult] = useState<YearlyResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculateYearly = (p: PersonData): YearlyResult => {
        const seed = p.name.length + parseInt(p.year) + parseInt(p.month) + parseInt(p.day);

        // 年間テーマ
        const themes = [
            "飛躍の年 - 新しい挑戦が実を結ぶ",
            "安定の年 - 足元を固めて地力を養う",
            "変革の年 - 自分の殻を破るとき",
            "愛の年 - 人との絆が深まる",
            "学びの年 - 知識を吸収し成長する",
            "収穫の年 - 努力の結果が現れる"
        ];

        const generalLuck = [
            "2026年はあなたにとって、これまでの努力が形となり現れる重要な一年となります。特に前半は新しいことに挑戦するチャンスが多く巡ってくるでしょう。",
            "自分のペースを大切にすることで、大きな成果を得られる一年です。焦らず着実に進むことが成功への鍵となります。",
            "変化の多い一年となりますが、その波に乗ることで新しい自分を発見できるでしょう。柔軟な思考が幸運を呼び寄せます。",
            "人との繋がりが幸運の鍵となる一年です。周りの人への感謝を忘れずに過ごすことで、素晴らしいサポートが得られます。"
        ];

        const loveLuck = [
            "恋愛面では、春頃に素敵な出会いが期待できます。既存のパートナーとは、より深い絆で結ばれる出来事があるでしょう。",
            "自分磨きに最適な時期です。内面の美しさを磨くことで、自然と人を惹きつける魅力が増していきます。",
            "素直な気持ちを伝えることが大切です。意地を張らずに、自分の心に正直になることで愛が深まります。"
        ];

        const workLuck = [
            "仕事運は好調です。あなたのアイデアが評価され、大きなプロジェクトを任される可能性があります。",
            "スキルアップに注力すると良い一年です。資格取得や新しい技術の習得が、将来のキャリアアップに繋がります。",
            "チームワークを大切にすることで、仕事がスムーズに進みます。周囲とのコミュニケーションを密にしましょう。"
        ];

        const monthlyMarks = ["◎", "○", "△", "☆"];

        return {
            theme: themes[seed % themes.length],
            general: generalLuck[seed % generalLuck.length],
            love: loveLuck[seed % loveLuck.length],
            work: workLuck[seed % workLuck.length],
            monthly: Array.from({ length: 12 }, (_, i) => monthlyMarks[(seed + i) % monthlyMarks.length])
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const yearlyResult = calculateYearly(person);
        setResult(yearlyResult);
        setIsLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setPerson({ name: '', year: '1990', month: '1', day: '1' });
    };

    if (result) {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3 className={styles.resultTitle}>☽ 2026年の運勢 ☽</h3>
                    <p className={styles.subtitle}>{person.name}様の年間運勢</p>
                </div>

                <div className={styles.themeBox}>
                    <span className={styles.themeLabel}>あなたの2026年のテーマ</span>
                    <div className={styles.themeValue}>{result.theme}</div>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>✧ 全体運</h4>
                    <p className={styles.detailText}>{result.general}</p>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>♡ 恋愛運</h4>
                    <p className={styles.detailText}>{result.love}</p>
                </div>

                <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>💼 仕事運</h4>
                    <p className={styles.detailText}>{result.work}</p>
                </div>

                <div className={styles.monthLuck}>
                    <h4 className={styles.detailTitle} style={{ justifyContent: 'center' }}>📅 月別運気バイオリズム</h4>
                    <div className={styles.monthGrid}>
                        {result.monthly.map((mark, i) => (
                            <div key={i} className={styles.monthItem}>
                                <span className={styles.monthLabel}>{i + 1}月</span>
                                <span className={styles.monthMark} style={{
                                    color: mark === '☆' ? '#ffd700' : mark === '◎' ? '#ff69b4' : mark === '○' ? '#87ceeb' : '#a9a9a9'
                                }}>{mark}</span>
                            </div>
                        ))}
                    </div>
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
                <span className={styles.icon}>☽</span>
                <h3 className={styles.title}>2026年の運勢</h3>
                <p className={styles.subtitle}>2026年、あなたに訪れる運命の物語</p>
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
                    disabled={!person.name || isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loading}>
                            <span className={styles.loadingDot}>✧</span>
                            未来の年代記を開いています
                            <span className={styles.loadingDot}>✧</span>
                        </span>
                    ) : (
                        '2026年を占う'
                    )}
                </button>
            </form>
        </div>
    );
}
