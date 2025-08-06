"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import BmiEvaluation from "@/components/BmiEvaluationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { useGetBmiEvaluation } from "@/hooks/bmiEvaluation/useGetBmiEvaluation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useUserStorage } from "@/hooks/useUserStorage";
import { Box, Center, Spinner, VStack, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBmiEvaluation() {
  const router = useRouter();
  const params = useParams();
  const userStorage = useUserStorage();

  const isProfessor = userStorage?.perfil === Perfil.PROFESSOR;

  useProtectedRoute(["admin", "professor"]);

  const bmiEvaluation = params.id;

  const [verificationLoading, setVerificationLoading] =
    useState<boolean>(false);

  const {
    data: bmiEvaluationData,
    isLoading,
    error,
  } = useGetBmiEvaluation(bmiEvaluation as string);

  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404 || status === 400) {
        notFound();
      }
    }
  }, [error]);

  useEffect(() => {
    if (!bmiEvaluationData) return;

    setVerificationLoading(true);

    if (
      isProfessor &&
      bmiEvaluationData?.id_usuario_avaliacao !== userStorage?.id
    ) {
      router.push("/401");
    }

    setVerificationLoading(false);
  }, [
    bmiEvaluationData,
    bmiEvaluationData?.id_usuario_avaliacao,
    isProfessor,
    router,
    userStorage,
  ]);

  if (isLoading || verificationLoading) {
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

  return (
    <Flex height={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <BmiEvaluation isEdit bmiEvaluation={bmiEvaluationData!} />
      <Footer />
    </Flex>
  );
}
