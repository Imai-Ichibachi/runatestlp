'use client';

import { useState, useEffect } from 'react';
import styles from './YesNoFortune.module.css';

export default function YesNoFortune() {
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState<{ answer: string; advice: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // For loading animation text cycling
    const [loadingText, setLoadingText] = useState('月があなたの悩みに耳を傾けています...');

    // Function to handle loading text rotation
    useEffect(() => {
        if (!isLoading) return;
        const texts = [
            "星の配置を読み解いています...",
            "あなたのオーラを感じ取っています...",
            "月の啓示を受け取っています...",
            "運命の言葉を紡いでいます..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[i % texts.length]);
            i++;
        }, 2000);
        return () => clearInterval(interval);
    }, [isLoading]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) {
            setQuestion('No Question');
        }
        setIsLoading(true);
        try {
            const response = await fetch('/api/yesno', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            const data = await response.json();
            setResult({ answer: data.answer, advice: data.message });
        } catch (error) {
            console.error('Fortune Error:', error);
            setResult({ answer: 'ERROR', advice: '星の声が届きませんでした...もう一度お試しください。' });
        }
        setIsLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setQuestion('');
    };

    if (result) {
        return (
            <div className={styles.container}>
                <div className={styles.resultContainer}>
                    <div className={styles.answerBox}>
                        <p className={styles.subtitle} style={{ marginBottom: '1rem' }}>月詠ルナからの手紙</p>

                        {/* We hide the simple YES/NO big text to focus on the message, 
                            though we can still show a subtle indicator if needed. 
                            For this request, we focus on the text. */}

                        <div className={styles.letterContent}>
                            {result.advice.split('\n').map((line, i) => (
                                <p key={i} style={{ marginBottom: '0.8em', lineHeight: '1.8' }}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* Old advice box removed in favor of the letter style above */}

                    <button onClick={resetForm} className={styles.retryButton}>
                        別の質問をする
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>🌙</span>
                <h3 className={styles.title}>月光の悩み相談室</h3>
                <p className={styles.subtitle}>
                    あなたの心の声を、ルナに聞かせてください。<br />
                    どんな些細な悩みでも、月は優しく照らします。
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>ご相談内容</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="例：最近、仕事での人間関係に悩んでいます。上司との折り合いが悪く、転職も考えているのですが、今は動くべき時期でしょうか？私の本音としては..."
                        className={styles.textarea}
                        style={{ minHeight: '150px' }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loading}>
                            <span className={styles.loadingDot}>✨</span>
                            {loadingText}
                            <span className={styles.loadingDot}>✨</span>
                        </span>
                    ) : (
                        'ルナに相談する'
                    )}
                </button>
            </form>
        </div>
    );
}
