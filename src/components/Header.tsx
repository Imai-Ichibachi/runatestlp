import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>☽</span>
                    <span className={styles.logoText}>月詠ルナ</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/#fortune" className={styles.navLink}>無料鑑定</Link>
                    <Link href="/#menu" className={styles.navLink}>占いメニュー</Link>
                    <Link href="/#profile" className={styles.navLink}>占い師紹介</Link>
                </nav>

                <div className={styles.actions}>
                    <Link href="/login" className={styles.loginLink}>ログイン</Link>
                    <Link href="/register" className={styles.registerButton}>会員登録</Link>
                </div>
            </div>
        </header>
    );
}
