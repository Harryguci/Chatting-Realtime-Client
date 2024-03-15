import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../_assets/scss/style.scss'
import React from "react";
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
        <React.Fragment>{children}</React.Fragment>
    );
}
