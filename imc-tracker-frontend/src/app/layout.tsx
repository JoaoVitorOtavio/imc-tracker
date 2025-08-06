"use client";

import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider defaultTheme="light">
          <ReactQueryProvider>
            <Toaster />
            {children}
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
