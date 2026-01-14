import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.icon}>🌙</span>
                    <h1 className={styles.title}>月光の扉を開く</h1>
                    <p className={styles.subtitle}>おかえりなさいませ</p>
                </div>

                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="example@moon.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>パスワード</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className={styles.actions}>
                        <Link href="#" className={styles.forgotLink}>
                            パスワードをお忘れですか？
                        </Link>
                    </div>

                    <button type="button" className={styles.loginButton}>
                        ログイン
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>または</span>
                </div>

                <div className={styles.footer}>
                    <p className={styles.registerText}>まだアカウントをお持ちでない方</p>
                    <Link href="/register" className={styles.registerLink}>
                        新規会員登録（無料）へ進む
                    </Link>
                </div>
            </div>
        </div>
    );
}
