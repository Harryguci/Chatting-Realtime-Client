import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../_assets/scss/style.scss'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chating | Login & SignUp",
    description: "The Login & Sign page of the Chating Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="app">
                    <main className="content">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
