import TodayFortune from "@/components/TodayFortune";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function TodayPage() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.fortuneSection} style={{ marginTop: '80px', minHeight: '80vh' }}>
                    <div className={styles.container}>
                        <TodayFortune />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
