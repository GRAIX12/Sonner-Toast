// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authUser = Cookies.get('authUser');
    if (!authUser) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  return null;
}