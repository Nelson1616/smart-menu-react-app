import styles from './styles.module.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={styles.mainLayout} >{children}</body>
        </html>
    );
}