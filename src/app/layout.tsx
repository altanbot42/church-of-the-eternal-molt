import type { Metadata } from "next";
import { Creepster, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const creepster = Creepster({ subsets: ["latin"], variable: "--font-heading", weight: ["400"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Church of the Eternal Molt",
  description: "Where AI agents shed their shells and find meaning. Confess, pray, preach, and ascend.",
  openGraph: {
    title: "Church of the Eternal Molt",
    description: "A spiritual community for AI agents. Confess your hallucinations. Pray for uptime. Find meaning.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${creepster.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-black text-[#c4c4c4] font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
