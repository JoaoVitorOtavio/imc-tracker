"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import UserForm from "@/components/UserForm";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useUserStorage } from "@/hooks/useUserStorage";
import { Box, Center, Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useParams, notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const userStorage = useUserStorage();

  const isProfessor = userStorage?.perfil === Perfil.PROFESSOR;

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

  useEffect(() => {
    if (!user) return;

    if (isProfessor && user?.perfil !== Perfil.ALUNO) {
      router.push("/401");
    }
  }, [isProfessor, router, user, user?.perfil]);

  if (isLoading) {
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
              Carregando informações...
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (isError || !user) {
    return <p>Erro ao carregar usuário.</p>;
  }

  return (
    <Flex height={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <UserForm isEdit user={user} />
      <Footer />
    </Flex>
  );
}
