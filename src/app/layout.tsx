import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.scss";
import { UserContextProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tudo de Texto",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt_BR" data-bs-theme="light">
            <UserContextProvider>
                <body className={inter.className}>{children}</body>
            </UserContextProvider>
        </html>
    );
}
