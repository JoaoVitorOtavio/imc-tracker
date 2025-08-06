"use client";

import BmiEvaluation from "@/components/BmiEvaluationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { useGetBmiEvaluation } from "@/hooks/bmiEvaluation/useGetBmiEvaluation";
import { Box, Center, Spinner, VStack, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditBmiEvaluation() {
  const params = useParams();
  const bmiEvaluation = params.id;

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
  }, [bmiEvaluationData, error]);

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

  return (
    <Flex height={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <BmiEvaluation isEdit bmiEvaluation={bmiEvaluationData!} />
      <Footer />
    </Flex>
  );
}
