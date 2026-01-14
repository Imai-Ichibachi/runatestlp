import Link from 'next/link';
import styles from './page.module.css';

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.icon}>✨</span>
                    <h1 className={styles.title}>星の導きを受け取る</h1>
                    <p className={styles.subtitle}>新しい運命があなたを待っています</p>
                </div>

                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>お名前（ニックネーム可）</label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            placeholder="ルナ"
                        />
                    </div>

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
                            placeholder="8文字以上の英数字"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>生年月日（占い精度向上用）</label>
                        <div className={styles.birthDateContainer}>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="年 (YYYY)"
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="月"
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="日"
                            />
                        </div>
                    </div>

                    <button type="button" className={styles.registerButton}>
                        会員登録する（無料）
                    </button>
                </form>

                <div className={styles.divider}></div>

                <div className={styles.footer}>
                    <p className={styles.loginText}>すでにアカウントをお持ちの方</p>
                    <Link href="/login" className={styles.loginLink}>
                        ログインはこちら
                    </Link>
                </div>
            </div>
        </div>
    );
}
