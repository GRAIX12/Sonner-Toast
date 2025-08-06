'use client';

import { User } from "@/app/types/User";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import '@/app/styles/forms.css';
import '@/app/styles/modals.css';

const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface Props {
  user: User | null;
  onUpdate: (u: User) => void;
  onClose: () => void;
}

export default function EditUserModal({ user, onUpdate, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  if (!user) return null;

  const onSubmit = (data: UpdateUserFormData) => {
    onUpdate({ ...user, ...data });
    toast.success('User updated successfully!');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-content">
        <h2 className="modal-title">Update User</h2>

        <div>
          <input className="form-input" {...register("name")} placeholder="Name" />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div>
          <input className="form-input" type="email" {...register("email")} placeholder="Email" />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="modal-button modal-button-cancel">
            Cancel
          </button>
          <button type="submit" className="modal-button modal-button-confirm">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}