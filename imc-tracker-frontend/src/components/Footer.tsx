"use client";

import { Box, Flex, Link, Text, Stack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="blue.500" color="white" py={12} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="6xl"
        mx="auto"
        px={4}
        align="center"
        justify="space-between"
      >
        <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
          &copy; {new Date().getFullYear()} Academia IMC. Todos os direitos
          reservados.
        </Text>

        <Stack direction="row" gap={6} mt={{ base: 4, md: 0 }}>
          <Link
            color={"white"}
            fontSize="sm"
            _hover={{ textDecoration: "underline" }}
          >
            Termos de Uso
          </Link>
          <Link
            color={"white"}
            fontSize="sm"
            _hover={{ textDecoration: "underline" }}
          >
            Política de Privacidade
          </Link>
          <Link
            color={"white"}
            fontSize="sm"
            _hover={{ textDecoration: "underline" }}
          >
            Contato
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
