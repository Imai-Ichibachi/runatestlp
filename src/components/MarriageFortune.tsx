'use client';

import { useState } from 'react';
import styles from './MarriageFortune.module.css';

interface PersonData {
    name: string;
    year: string;
    month: string;
    day: string;
}

interface MarriageResult {
    partner: string;
    characteristics: string;
    meetingDate: string;
    advice: string;
}

export default function MarriageFortune() {
    const [person, setPerson] = useState<PersonData>({ name: '', year: '1990', month: '1', day: '1' });
    const [result, setResult] = useState<MarriageResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const years = Array.from({ length: 80 }, (_, i) => (2010 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const handlePersonChange = (field: keyof PersonData, value: string) => {
        setPerson(prev => ({ ...prev, [field]: value }));
    };

    const calculateMarriage = (p: PersonData): MarriageResult => {
        const seed = p.name.length + parseInt(p.year) + parseInt(p.month) + parseInt(p.day);

        // パートナーのイニシャル決定
        const initials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const initialIndex = seed % initials.length;
        const partnerInitial = initials[initialIndex];

        // 特徴の決定
        const characteristicsList = [
            "誠実で穏やかな性格。あなたの話を親身になって聞いてくれる人です。",
            "情熱的でリーダーシップがある人。あなたを力強く引っ張ってくれます。",
            "知的でユーモアのある人。一緒にいると常に笑いが絶えないでしょう。",
            "芸術的センスがあり、感受性が豊かな人。あなたの心を癒やしてくれます。",
            "堅実で責任感が強い人。将来を見据えて一緒に歩んでいけるパートナーです。",
            "冒険好きで活動的な人。新しい世界をあなたに見せてくれるでしょう。"
        ];
        const charIndex = seed % characteristicsList.length;

        // 出会いの時期（現在から数ヶ月後〜数年後）
        const monthsAhead = (seed % 24) + 1;
        const meetingDateObj = new Date();
        meetingDateObj.setMonth(meetingDateObj.getMonth() + monthsAhead);
        const meetingDateStr = `${meetingDateObj.getFullYear()}年${meetingDateObj.getMonth() + 1}月頃`;

        return {
            partner: `イニシャル「${partnerInitial}」の方`,
            characteristics: characteristicsList[charIndex],
            meetingDate: meetingDateStr,
            advice: "その時期は友人の紹介や、新しい趣味の場に顔を出してみると良いでしょう。"
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const marriageResult = calculateMarriage(person);
        setResult(marriageResult);
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
                    <h3 className={styles.resultTitle}>💍 結婚占い結果 💍</h3>
                    <p className={styles.subtitle}>{person.name}様の運命のお相手</p>
                </div>

                <div className={styles.partnerProfile}>
                    <span className={styles.profileLabel}>お相手の特徴</span>
                    <p className={styles.profileText}>{result.partner}</p>
                    <p className={styles.profileText}>{result.characteristics}</p>
                </div>

                <div className={styles.timingBox}>
                    <span className={styles.profileLabel}>運命の出会いが訪れる時期</span>
                    <span className={styles.timingDate}>{result.meetingDate}</span>
                </div>

                <div className={styles.messageBox}>
                    <h4 className={styles.profileLabel} style={{ textAlign: 'center' }}>✨ アドバイス ✨</h4>
                    <p className={styles.profileText}>{result.advice}</p>
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
                <span className={styles.icon}>💍</span>
                <h3 className={styles.title}>結婚占い</h3>
                <p className={styles.subtitle}>あなたの運命の相手と結婚の時期を占います</p>
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
                            未来の糸を紡いでいます
                            <span className={styles.loadingDot}>✧</span>
                        </span>
                    ) : (
                        '結婚運を占う'
                    )}
                </button>
            </form>
        </div>
    );
}
