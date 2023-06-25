import Navigation from "@/components/ui/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/Theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={`${inter.className} text-sm`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div>{children}</div>
            <Footer />
            <ToastContainer theme="dark" hideProgressBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
