import type { GetServerSidePropsContext, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "@/components/providers/AuthProvider";
import TanStackProvier from "@/components/providers/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stripe Subscriptions",
  description: "Learn how to integrate Stripe subscriptions with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanStackProvier>
              <Navbar isAuthenticated={isUserAuthenticated} />
              {children}
            </TanStackProvier>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
