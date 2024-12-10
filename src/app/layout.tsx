import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "@/app/globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes"
import {ThemeProvider} from "@/providers/theme-provider";
import {Toaster} from "@/components/ui/sonner"
import ReactQueryProvider from "@/providers/react-query-provider";
import ReduxProvider from "@/providers/redux-provider";

const jakarta = Plus_Jakarta_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'Slide',
    description: "Automate DMs and comments on Instagram",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body
                    className={jakarta.className}
                    suppressHydrationWarning
                >
                    <ThemeProvider
                        attribute={'class'}
                        defaultTheme={'dark'}
                        disableTransitionOnChange
                    >
                        <ReduxProvider>
                            <ReactQueryProvider>
                                {children}
                            </ReactQueryProvider>
                        </ReduxProvider>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
