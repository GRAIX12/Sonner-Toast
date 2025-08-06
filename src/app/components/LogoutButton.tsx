'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import '@/app/styles/buttons.css';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authUser');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}