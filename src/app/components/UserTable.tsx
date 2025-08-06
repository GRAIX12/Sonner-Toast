'use client';

import { User } from "@/app/types/User";
import '@/app/styles/table.css';

interface Props {
  users: User[];
  onEdit: (u: User) => void;
  onRemove: (id: number) => void;
}

export default function UserTable({ users, onEdit, onRemove }: Props) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="action-button edit-button"
                  onClick={() => onEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => onRemove(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}