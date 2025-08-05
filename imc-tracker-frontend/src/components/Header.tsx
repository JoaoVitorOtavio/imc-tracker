"use client";

import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <Box bg="blue.500" color="white" px={12} py={3}>
      <Flex align="center">
        <Heading as="h1" size="lg">
          Academia IMC
        </Heading>
        <Spacer />
        <Flex gap={5}>
          <Link
            onClick={() => router.push("/user/list")}
            mr={4}
            color={"white"}
          >
            Usuários
          </Link>
          <Link
            onClick={() => router.push("/bmi-evaluation/list")}
            mr={4}
            color={"white"}
          >
            Avaliações de IMC
          </Link>
          <Link onClick={() => router.push("/")} color={"white"}>
            Sair
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
