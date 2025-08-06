"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { useGetUsers } from "@/hooks/user/useGetUsers";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Input,
  Pagination,
  Skeleton,
  Spinner,
  Stack,
  Table,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import { useUserStorage } from "@/hooks/useUserStorage";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function UserList() {
  const router = useRouter();
  useProtectedRoute(["admin", "professor"]);

  const LIMIT = 15;

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const userStorage = useUserStorage();

  const { data: users, isLoading: loadingUsers } = useGetUsers({
    page,
    limit: LIMIT,
    nameOrUsername: search,
  });

  const { mutate: deleteUser, isPending: isDeleteLoading } = useDeleteUser();

  const handleSearch = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const onDelete = async (id: string) => {
    deleteUser(id);
  };

  if (loadingUsers)
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

  return (
    <Flex minHeight={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <Stack width="full" gap="5" px={12} mt={5}>
        {!users?.data.length ? (
          <div>Nenhum usuário encontrado</div>
        ) : (
          <>
            <Heading size="xl" display={"flex"} justifyContent={"center"}>
              Listagem de avaliações de usuários
            </Heading>
            <Skeleton loading={loadingUsers || isDeleteLoading}>
              <Flex
                gap="4"
                align="center"
                mt={5}
                px={5}
                direction={{ base: "column", md: "row" }}
              >
                <Button
                  width={{ base: "80%", md: "auto" }}
                  colorPalette="green"
                  variant="surface"
                  size="sm"
                  onClick={() => router.push("/user/create")}
                >
                  <FaCirclePlus /> Adicionar novo usuário
                </Button>
                <Input
                  width="80%"
                  onChange={(e) => handleSearch(e.target.value)}
                  id="searchInput"
                  size="sm"
                  placeholder="Pesquisar por nome ou usuário"
                  bg="white"
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  borderColor="gray.300"
                />
              </Flex>
            </Skeleton>
            <Skeleton loading={loadingUsers || isDeleteLoading}>
              <div style={{ overflowX: "auto" }}>
                <Table.Root size="md" variant="outline" striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Nome</Table.ColumnHeader>
                      <Table.ColumnHeader>Usuario</Table.ColumnHeader>
                      <Table.ColumnHeader>Perfil</Table.ColumnHeader>
                      <Table.ColumnHeader>Situação</Table.ColumnHeader>
                      <Table.ColumnHeader>Data de inclusão</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                      {userStorage?.perfil === "admin" && (
                        <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                      )}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {users?.data.map((user) => (
                      <Table.Row key={user.id}>
                        <Table.Cell>{user.nome}</Table.Cell>
                        <Table.Cell>{user.usuario}</Table.Cell>
                        <Table.Cell>{user.perfil}</Table.Cell>
                        <Table.Cell
                          color={user.situacao === "ativo" ? "green" : "red"}
                        >
                          {user.situacao}
                        </Table.Cell>
                        <Table.Cell>{user.dt_inclusao.toString()}</Table.Cell>
                        <Table.Cell>
                          <Button
                            colorPalette="blue"
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/user/edit/${user.id}`)}
                          >
                            Editar
                          </Button>
                        </Table.Cell>
                        {userStorage?.perfil === "admin" && (
                          <Table.Cell>
                            <Modal
                              confirmFunc={() => onDelete(user.id)}
                              btnTitle="Excluir"
                              cancelBtnTitle="Cancelar"
                              confirmBtnTitle="Excluir"
                              btnColorPalette="red"
                              modalTitle="Tem certeza que deseja excluir?"
                              modalDescription="Esta ação é irreversível"
                            />
                          </Table.Cell>
                        )}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>

                <Pagination.Root
                  count={users?.total}
                  pageSize={LIMIT}
                  page={page}
                  onPageChange={(e) => setPage(e.page)}
                  mb={10}
                  colorPalette={"blue"}
                >
                  <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                    <Pagination.PrevTrigger asChild>
                      <IconButton>
                        <LuChevronLeft />
                      </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                      render={(page) => (
                        <IconButton
                          variant={{ base: "ghost", _selected: "outline" }}
                        >
                          {page.value}
                        </IconButton>
                      )}
                    />

                    <Pagination.NextTrigger asChild>
                      <IconButton>
                        <LuChevronRight />
                      </IconButton>
                    </Pagination.NextTrigger>
                  </ButtonGroup>
                </Pagination.Root>
              </div>
            </Skeleton>
          </>
        )}
      </Stack>
      <Footer />
    </Flex>
  );
}
