"use client";

import { useRouter } from "next/navigation";
import "./Header.css";
import { useUserStorage } from "@/hooks/useUserStorage";
import { Perfil } from "@/common/enums/perfil.enum";
import { useLogout } from "@/hooks/auth/useLogout";
import { Box, Center, Spinner, VStack, Text } from "@chakra-ui/react";

export default function Header() {
  const router = useRouter();
  const userStorage = useUserStorage();

  const isAluno = userStorage?.perfil === Perfil.ALUNO;

  function onLogoutSuccess() {
    router.replace("/");
  }

  const { mutate: logout, isPending: isLogoutPending } =
    useLogout(onLogoutSuccess);

  if (isLogoutPending) {
    return (
      <Box
        position="fixed"
        inset={0}
        bg="whiteAlpha.800"
        zIndex={1000}
        backdropFilter="blur(6px)"
      >
        <Center h="100vh">
          <VStack gap={4}>
            <Spinner color="teal.500" size="xl" />
            <Text fontSize="lg" color="gray.600">
              Deslogando...
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <header className="header">
      <h1 className="logo">Academia IMC</h1>
      <nav className="nav">
        {!isAluno && <a onClick={() => router.push("/user/list")}>Usuários</a>}
        <a onClick={() => router.push("/bmi-evaluation/list")}>Avaliações</a>
        <a onClick={() => logout()}>Sair</a>
      </nav>
    </header>
  );
}
