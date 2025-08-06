// app/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types/User";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      return data.slice(0, 5);
    },
  });
};