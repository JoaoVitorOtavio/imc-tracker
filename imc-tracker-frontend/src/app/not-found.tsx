"use client";

import { Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="100vh"
      bg="gray.50"
      px={4}
    >
      <Heading fontSize={["4xl", "5xl"]} color="teal.500" mb={4}>
        404
      </Heading>
      <Text fontSize={["lg", "xl"]} color="gray.700" mb={6} textAlign="center">
        Opa! A página que você está procurando não foi encontrada.
      </Text>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => router.push("/")}
        _hover={{ opacity: 0.9 }}
      >
        Voltar para a Home
      </Button>
    </Flex>
  );
}
