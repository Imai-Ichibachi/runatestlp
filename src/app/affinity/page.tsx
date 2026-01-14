import AffinityFortune from "@/components/AffinityFortune";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function AffinityPage() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.fortuneSection} style={{ marginTop: '80px', minHeight: '80vh' }}>
                    <div className={styles.container}>
                        <AffinityFortune />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
