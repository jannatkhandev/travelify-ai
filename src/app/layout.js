import "./globals.css";
import './leaflet.css';
import { cn } from "../lib/utils";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/toaster";
import { fontSans } from "../lib/fonts";
import SessionWrapper from "../components/SessionWrapper"
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
  title: "Travelify AI - Your AI powered travel planner",
  description: "Travelify AI is your go to personalized vacation planner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
                className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  fontSans.variable
                )}><SessionWrapper>
                <ThemeProvider attribute="class" enableSystem={false}>
                  <NavBar/>
                  
        {children}
        <Toaster />
        <Footer/>
        </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
