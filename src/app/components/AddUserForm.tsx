'use client';

import { User } from "@/app/types/User";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import '@/app/styles/forms.css';
import '@/app/styles/buttons.css';

const addUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

interface Props {
  onAdd: (user: Omit<User, "id">) => void;
}

export default function AddUserForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = (data: AddUserFormData) => {
    onAdd(data);
    toast.success('User added successfully!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-user-form">
      <input
        className="add-user-input"
        placeholder="Name"
        {...register("name")}
      />
      <input
        className="add-user-input"
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      <button type="submit" className="add-user-button">
        Add User
      </button>
      {errors.name && <span className="error-message">{errors.name.message}</span>}
      {errors.email && <span className="error-message">{errors.email.message}</span>}
    </form>
  );
}