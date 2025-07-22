import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eyego - statistics",
    description: "View detailed statistics and analytics for your Eyego dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            { children }
        </>
    );
}
