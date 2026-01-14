import MoonSignFortune from "@/components/MoonSignFortune";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function MoonSignPage() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.fortuneSection} style={{ marginTop: '80px', minHeight: '80vh' }}>
                    <div className={styles.container}>
                        <MoonSignFortune />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
