// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { User } from "@/app/types/User";
import { useUsers } from '@/app/hooks/useUsers';
import UserTable from "@/app/components/UserTable";
import AddUserForm from "@/app/components/AddUserForm";
import EditUserModal from "@/app/components/EditUserModal";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton';
import toast from 'react-hot-toast';
import '@/app/styles/layout.css';

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, error } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    const authUser = Cookies.get('authUser');
    if (!authUser) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const addUser = (u: Omit<User, "id">) => {
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([...users, { id: nextId, ...u }]);
  };

  const updateUser = (u: User) => {
    setUsers(users.map((old) => (old.id === u.id ? u : old)));
  };

  const removeUser = (id: number) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    const renumberedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1
    }));
    setUsers(renumberedUsers);
    toast.success('User deleted successfully!');
  };

  if (isLoading) return <div className="loading-container">Loading users...</div>;
  if (error) return <div className="error-container">Error loading users</div>;

  return (
    <main className="main-container">
      <div className="header-container">
        <h1 className="page-title">Users</h1>
        <LogoutButton />
      </div>
      <AddUserForm onAdd={addUser} />
      <UserTable users={users} onEdit={setEditing} onRemove={removeUser} />
      <EditUserModal
        user={editing}
        onUpdate={updateUser}
        onClose={() => setEditing(null)}
      />
    </main>
  );
}