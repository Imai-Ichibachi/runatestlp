'use client';

import { useState, useEffect } from 'react';
import styles from './TodayFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface TodayResult {
    rank: string;
    stars: number;
    advice: string;
    luckyColor: string;
    luckyTime: string;
}

export default function TodayFortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1995', month: '1', day: '1' });
    const [result, setResult] = useState<TodayResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const today = new Date();
        setTodayDate(`${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`);
    }, []);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculateToday = (p: PersonData): TodayResult => {
        const today = new Date();
        // 日替わりシード
        const seed = p.name.length + parseInt(p.year) + parseInt(p.month) + parseInt(p.day) + today.getDate();

        const ranks = ['1位', '2位', '3位', '4位', '5位', '6位', '7位', '8位', '9位', '10位', '11位', '12位'];
        const rankIndex = seed % ranks.length;

        const colors = ['パールホワイト', 'シェルピンク', 'ミントグリーン', 'ラベンダー', 'アクアブルー', 'レモンイエロー', 'コーラルオレンジ'];
        const times = ['朝', '昼下がり', '夕方', '夜', '深夜'];

        const advices = [
            "今日は直感が冴え渡る一日。迷ったら最初の感覚を信じて行動しましょう。素晴らしい発見があるはずです。",
            "コミュニケーション運が上昇中。久しぶりの友人に連絡を取ってみると、嬉しいニュースが聞けるかもしれません。",
            "少し疲れが出やすいかもしれません。無理をせず、自分の時間を大切にしてください。バスタイムを長めにとると吉。",
            "新しいことに挑戦するのに最適な日です。今まで躊躇していたことがあれば、今日こそ第一歩を踏み出してみましょう。",
            "予期せぬラッキーな出来事がありそう。いつもと違う道を通って帰ると、素敵な出会いがあるかもしれません。",
            "集中力が高まっています。仕事や勉強に打ち込むと、驚くような成果が得られるでしょう。",
        ];

        return {
            rank: ranks[rankIndex],
            stars: 5 - Math.floor(rankIndex / 3), // 1-3位5, 4-6位4...
            advice: advices[seed % advices.length],
            luckyColor: colors[seed % colors.length],
            luckyTime: times[seed % times.length]
        };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let currentPerson = person;
        if (!person.name) {
            currentPerson = { ...person, name: 'Guest' };
            setPerson(currentPerson); // Update state for UI
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResult(calculateToday(currentPerson)); // Use the potentially updated person object
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
                    <div className={styles.dateDisplay}>{todayDate}の運勢</div>

                    <div className={styles.rankBox}>
                        <span className={styles.rankLabel}>あなたの運勢ランキング</span>
                        <span className={styles.rankValue}>{result.rank}</span>
                        <div style={{ color: '#ffd700', fontSize: '1.5rem', marginTop: '0.5rem' }}>
                            {'★'.repeat(result.stars)}{'☆'.repeat(5 - result.stars)}
                        </div>
                    </div>

                    <div className={styles.adviceBox}>
                        <h4 className={styles.adviceTitle}>✧ 今日のメッセージ</h4>
                        <p className={styles.adviceText}>{result.advice}</p>
                    </div>

                    <div className={styles.luckyGrid}>
                        <div className={styles.luckyItem}>
                            <span className={styles.luckyLabel}>ラッキーカラー</span>
                            <span className={styles.luckyValue}>{result.luckyColor}</span>
                        </div>
                        <div className={styles.luckyItem}>
                            <span className={styles.luckyLabel}>ラッキータイム</span>
                            <span className={styles.luckyValue}>{result.luckyTime}</span>
                        </div>
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
                <span className={styles.icon}>📅</span>
                <h3 className={styles.title}>今日の運勢</h3>
                <p className={styles.subtitle}>毎日更新。あなたの一日を<br />輝かせるヒントをお届けします</p>
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
                            <span className={styles.loadingDot}>📅</span>
                            星の配置を読み取っています
                            <span className={styles.loadingDot}>📅</span>
                        </span>
                    ) : (
                        '今日を占う'
                    )}
                </button>
            </form>
        </div>
    );
}
