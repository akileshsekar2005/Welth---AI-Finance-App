import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { checkUser } from "@/lib/checkUser";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default async function RootLayout({ children }) {
  await checkUser();
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made by Akilesh </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}