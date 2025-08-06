"use client";

import { useRouter } from "next/navigation";
import "./Header.css";

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <h1 className="logo">Academia IMC</h1>
      <nav className="nav">
        <a onClick={() => router.push("/user/list")}>Usuários</a>
        <a onClick={() => router.push("/bmi-evaluation/list")}>
          Avaliações de IMC
        </a>
        <a onClick={() => router.push("/")}>Sair</a>
      </nav>
    </header>
  );
}
