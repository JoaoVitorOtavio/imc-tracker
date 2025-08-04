"use client";

import UserForm from "@/components/UserForm";
import { useGetUser } from "@/hooks/user/useGetUser";
import axios from "axios";
import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";

export default function EditUser() {
  const params = useParams();
  const userId = params.id;

  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useGetUser(userId as string);

  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404 || status === 400) {
        notFound();
      }
    }
  }, [error, userId]);

  if (isLoading) {
    return <p>Carregando usuário...</p>;
  }

  if (isError || !user) {
    return <p>Erro ao carregar usuário.</p>;
  }

  return (
    <div>
      <UserForm isEdit user={user} />
    </div>
  );
}
