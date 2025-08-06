// app/layout.tsx
'use client';

import { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import "@/app/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    const authUser = Cookies.get('authUser');
    if (!authUser) {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}