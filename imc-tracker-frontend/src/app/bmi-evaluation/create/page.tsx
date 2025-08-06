"use client";

import BmiEvaluation from "@/components/BmiEvaluationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Flex } from "@chakra-ui/react";

export default function CreateBmiEvaluation() {
  useProtectedRoute(["admin", "professor"]);

  return (
    <Flex height={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <BmiEvaluation />
      <Footer />
    </Flex>
  );
}
