import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './_assets/scss/style.scss';
import NavbarSidebar from "./_components/NavbarSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app d-flex">
          <NavbarSidebar />
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
