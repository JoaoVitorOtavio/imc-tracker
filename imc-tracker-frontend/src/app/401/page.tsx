"use client";

import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <VStack gap={6} textAlign="center">
        <Heading fontSize="6xl" color="red.500">
          401
        </Heading>
        <Text fontSize="xl" fontWeight="semibold">
          Acesso não autorizado
        </Text>
        <Text fontSize="md" color="gray.600">
          Você não tem permissão para acessar esta página.
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => router.push("/bmi-evaluation/list")}
        >
          Voltar para o início
        </Button>
      </VStack>
    </Box>
  );
}
