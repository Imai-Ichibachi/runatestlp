import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FreeFortune from '@/components/FreeFortune';
import styles from '../page.module.css';

export default function FreeFortunePage() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.fortuneSection} style={{ marginTop: '80px', minHeight: '80vh' }}>
                    <div className={styles.container}>
                        <FreeFortune />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
