'use client';

import { useState } from 'react';
import styles from './AffinityFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface AffinityResult {
    score: number;
    message: string;
    advice: string;
}

export default function AffinityFortune() {
    const [person1, setPerson1] = useState<PersonData>({ name: '', year: '1990', month: '1', day: '1' });
    const [person2, setPerson2] = useState<PersonData>({ name: '', year: '1990', month: '1', day: '1' });
    const [result, setResult] = useState<AffinityResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePerson1Change = (field: keyof PersonData, value: string) => {
        setPerson1(prev => ({ ...prev, [field]: value }));
    };

    const handlePerson2Change = (field: keyof PersonData, value: string) => {
        setPerson2(prev => ({ ...prev, [field]: value }));
    };

    const calculateAffinity = (p1: PersonData, p2: PersonData): AffinityResult => {
        // 簡易的な相性診断ロジック（名前の長さと日付のハッシュ値を使用）
        const seed1 = p1.name.length + parseInt(p1.year) + parseInt(p1.month) + parseInt(p1.day);
        const seed2 = p2.name.length + parseInt(p2.year) + parseInt(p2.month) + parseInt(p2.day);
        const totalSeed = seed1 + seed2;

        // 60〜100の間でスコアを生成
        const score = ((totalSeed % 41) + 60);

        let message = '';
        let advice = '';

        if (score >= 90) {
            message = '運命的な結びつきを感じます。二人の魂は深く共鳴し合っています。';
            advice = 'お互いの価値観を尊重し合うことで、より強固な絆が生まれるでしょう。';
        } else if (score >= 80) {
            message = '非常に良い相性です。お互いを高め合える素晴らしい関係になれるでしょう。';
            advice = 'コミュニケーションを大切にすることで、誤解なく愛を育めます。';
        } else if (score >= 70) {
            message = '安定した相性です。穏やかで心地よい時間を共有できるでしょう。';
            advice = '時にはサプライズや変化を取り入れると、関係がより深まります。';
        } else {
            message = '努力が必要な相性ですが、乗り越えることで強い絆が生まれます。';
            advice = '相手の意見に耳を傾け、歩み寄る姿勢が大切です。';
        }

        return { score, message, advice };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Communicate with the stars...
        await new Promise(resolve => setTimeout(resolve, 2000));

        const affinityResult = calculateAffinity(person1, person2);
        setResult(affinityResult);
        setIsLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setPerson1({ name: '', year: '1990', month: '1', day: '1' });
        setPerson2({ name: '', year: '1990', month: '1', day: '1' });
    };

    if (result) {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3 className={styles.resultTitle}>💗 相性診断結果 💗</h3>
                    <p className={styles.subtitle}>{person1.name}様 と {person2.name}様の相性</p>
                </div>

                <div className={styles.affinityScore}>
                    <span className={styles.scoreLabel}>二人の相性度は...</span>
                    <div className={styles.scoreValue}>
                        {result.score}<span className={styles.scoreSuffix}>%</span>
                    </div>
                </div>

                <div className={styles.messageBox}>
                    <h4 className={styles.messageTitle}>✨ 月詠ルナからのメッセージ ✨</h4>
                    <p className={styles.messageText}>{result.message}</p>
                    <br />
                    <p className={styles.messageText}>💡 アドバイス: <br />{result.advice}</p>
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
                <span className={styles.icon}>♡</span>
                <h3 className={styles.title}>相性占い</h3>
                <p className={styles.subtitle}>二人の運命を月星座から読み解きます</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.personSection}>
                    <h4 className={styles.sectionTitle}>一人目（あなた）</h4>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>お名前</label>
                        <input
                            type="text"
                            value={person1.name}
                            onChange={(e) => handlePerson1Change('name', e.target.value)}
                            placeholder="例：山田 花子"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>生年月日</label>
                        <div className={styles.dateRow}>
                            <select
                                value={person1.year}
                                onChange={(e) => handlePerson1Change('year', e.target.value)}
                                className={styles.select}
                            >
                                {years.map((y) => <option key={y} value={y}>{y}年</option>)}
                            </select>
                            <select
                                value={person1.month}
                                onChange={(e) => handlePerson1Change('month', e.target.value)}
                                className={styles.select}
                            >
                                {months.map((m) => <option key={m} value={m}>{m}月</option>)}
                            </select>
                            <select
                                value={person1.day}
                                onChange={(e) => handlePerson1Change('day', e.target.value)}
                                className={styles.select}
                            >
                                {days.map((d) => <option key={d} value={d}>{d}日</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.personSection}>
                    <h4 className={styles.sectionTitle}>二人目（お相手）</h4>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>お名前</label>
                        <input
                            type="text"
                            value={person2.name}
                            onChange={(e) => handlePerson2Change('name', e.target.value)}
                            placeholder="例：鈴木 一郎"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>生年月日</label>
                        <div className={styles.dateRow}>
                            <select
                                value={person2.year}
                                onChange={(e) => handlePerson2Change('year', e.target.value)}
                                className={styles.select}
                            >
                                {years.map((y) => <option key={y} value={y}>{y}年</option>)}
                            </select>
                            <select
                                value={person2.month}
                                onChange={(e) => handlePerson2Change('month', e.target.value)}
                                className={styles.select}
                            >
                                {months.map((m) => <option key={m} value={m}>{m}月</option>)}
                            </select>
                            <select
                                value={person2.day}
                                onChange={(e) => handlePerson2Change('day', e.target.value)}
                                className={styles.select}
                            >
                                {days.map((d) => <option key={d} value={d}>{d}日</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!person1.name || !person2.name || isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loading}>
                            <span className={styles.loadingDot}>✧</span>
                            二人の星を重ねています
                            <span className={styles.loadingDot}>✧</span>
                        </span>
                    ) : (
                        '相性を占う'
                    )}
                </button>
            </form>
        </div>
    );
}
