'use client';

import { useState } from 'react';
import styles from './MoneyFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface MoneyResult {
    score: number;
    level: string;
    luckyItem: string;
    luckyAction: string;
    advice: string;
}

export default function MoneyFortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1990', month: '1', day: '1' });
    const [result, setResult] = useState<MoneyResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculateMoney = (p: PersonData): MoneyResult => {
        const seed = p.name.length + parseInt(p.year) * 2 + parseInt(p.month) * 3 + parseInt(p.day);
        const today = new Date();
        const dailySeed = seed + today.getDate();

        // 40〜100の間でスコア
        const score = ((dailySeed % 61) + 40);

        let level = '';
        let advice = '';

        if (score >= 90) {
            level = '絶好調！';
            advice = '金運が最高潮に達しています。宝くじの購入や投資など、直感を信じて行動すると吉。思いがけない臨時収入の予感も。';
        } else if (score >= 75) {
            level = '好調';
            advice = 'お金の流れが良くなっています。自己投資にお金を使うと、後で大きなリターンとなって返ってくるでしょう。';
        } else if (score >= 55) {
            level = '安定';
            advice = '堅実な金運です。無駄遣いは避け、貯蓄に回すことで運気が上昇します。家計簿をつけるのもおすすめです。';
        } else {
            level = '要注意';
            advice = '衝動買いに注意が必要な時期です。大きな買い物は控え、財布の紐を固くしましょう。金色の小物が運気アップの鍵。';
        }

        const items = ['長財布', 'ゴールドのアクセサリー', 'カエルの置物', '招き猫', '観葉植物', '柑橘系の香り'];
        const actions = ['トイレ掃除', '玄関の拭き掃除', '不要なレシートの整理', '小銭洗い', '募金', '感謝の言葉を口にする'];

        return {
            score,
            level,
            luckyItem: items[dailySeed % items.length],
            luckyAction: actions[dailySeed % actions.length],
            advice
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const moneyResult = calculateMoney(person);
        setResult(moneyResult);
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
                    <h3 className={styles.resultTitle}>💰 金運診断結果 💰</h3>
                    <p className={styles.subtitle}>{person.name}様の金運</p>
                </div>

                <div className={styles.scoreBox}>
                    <span className={styles.scoreLabel}>現在の金運レベル: {result.level}</span>
                    <div className={styles.scoreValue}>
                        {result.score}<span className={styles.scoreSuffix}>点</span>
                    </div>
                </div>

                <div className={styles.adviceBox}>
                    <div className={styles.itemBox}>
                        <span className={styles.itemLabel}>✨ ラッキーアイテム</span>
                        <span className={styles.itemValue}>{result.luckyItem}</span>
                    </div>
                    <div className={styles.itemBox}>
                        <span className={styles.itemLabel}>🏃 ラッキーアクション</span>
                        <span className={styles.itemValue}>{result.luckyAction}</span>
                    </div>
                    <p style={{ lineHeight: '1.8', margin: 0 }}>
                        {result.advice}
                    </p>
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
                <span className={styles.icon}>💰</span>
                <h3 className={styles.title}>金運占い</h3>
                <p className={styles.subtitle}>あなたの財運と金運アップの秘訣を占います</p>
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
                            黄金の星を数えています
                            <span className={styles.loadingDot}>✧</span>
                        </span>
                    ) : (
                        '金運を占う'
                    )}
                </button>
            </form>
        </div>
    );
}
