"use client";

import { useRouter } from "next/navigation";
import "./Header.css";
import { useUserStorage } from "@/hooks/useUserStorage";
import { Perfil } from "@/common/enums/perfil.enum";

export default function Header() {
  const router = useRouter();
  const userStorage = useUserStorage();

  const isAluno = userStorage?.perfil === Perfil.ALUNO;

  return (
    <header className="header">
      <h1 className="logo">Academia IMC</h1>
      <nav className="nav">
        {!isAluno && <a onClick={() => router.push("/user/list")}>Usuários</a>}
        <a onClick={() => router.push("/bmi-evaluation/list")}>Avaliações</a>
        <a onClick={() => router.push("/")}>Sair</a>
      </nav>
    </header>
  );
}
