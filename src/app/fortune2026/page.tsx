import Year2026Fortune from "@/components/Year2026Fortune";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function Fortune2026Page() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.fortuneSection} style={{ marginTop: '80px', minHeight: '80vh' }}>
                    <div className={styles.container}>
                        <Year2026Fortune />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
