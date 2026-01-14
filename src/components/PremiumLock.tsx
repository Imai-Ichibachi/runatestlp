import Link from 'next/link';
import styles from './PremiumLock.module.css';
import { ReactNode } from 'react';

interface PremiumLockProps {
    children: ReactNode;
    title?: string;
}

export default function PremiumLock({ children, title = "この先は有料会員限定です" }: PremiumLockProps) {
    return (
        <div className={styles.container}>
            <div className={styles.blurredContent}>
                {children}
            </div>

            <div className={styles.overlay}>
                <div className={styles.lockIcon}>🔒</div>
                <h3 className={styles.message}>{title}</h3>
                <p className={styles.subMessage}>
                    帝王学と四柱推命による精密な分析結果や、<br />
                    あなたの運命のバイオリズムを全て確認できます。
                </p>
                <Link href="/register" className={styles.registerButton}>
                    会員登録して全て見る
                </Link>
            </div>
        </div>
    );
}
