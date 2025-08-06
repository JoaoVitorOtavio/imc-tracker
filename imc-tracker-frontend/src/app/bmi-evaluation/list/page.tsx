"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal";
import { useDeleteBmiEvaluation } from "@/hooks/bmiEvaluation/useDeleteBmiEvaluation";
import { useGetBmiEvaluations } from "@/hooks/bmiEvaluation/useGetBmiEvaluations";
import { useGetUsers } from "@/hooks/user/useGetUsers";
import { useUserStorage } from "@/hooks/useUserStorage";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Field,
  Flex,
  Heading,
  IconButton,
  NativeSelect,
  Pagination,
  Skeleton,
  Spinner,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function ListBmiEvaluation() {
  const router = useRouter();
  const userStorage = useUserStorage();

  const LIMIT = 15;

  const [page, setPage] = useState<number>(1);
  const [teacherId, setTeacherId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  const isAluno = userStorage?.perfil === Perfil.ALUNO;
  const isProfessor = userStorage?.perfil === Perfil.PROFESSOR;
  const isAdmin = userStorage?.perfil === Perfil.ADMIN;

  const idUsuarioAluno = isAluno ? userStorage.id : studentId;
  const idUsuarioAvaliacao = isProfessor ? userStorage.id : teacherId;

  const {
    data: bmiEvaluations,
    isLoading: loadingBmiEvaluations,
    error,
  } = useGetBmiEvaluations({
    page,
    limit: LIMIT,
    id_usuario_aluno: idUsuarioAluno,
    id_usuario_avaliacao: idUsuarioAvaliacao,
  });

  const { data: teachers, isLoading: loadingTeachers } = useGetUsers({
    role: Perfil.PROFESSOR,
  });

  const { data: students, isLoading: loadingStudents } = useGetUsers({
    role: Perfil.ALUNO,
  });

  const { mutate: deleteBmiEvaluation, isPending: isDeleteLoading } =
    useDeleteBmiEvaluation();

  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404 || status === 400) {
        notFound();
      }
    }
  }, [error]);

  const onDelete = async (id: string) => {
    deleteBmiEvaluation(id);
  };

  if (loadingBmiEvaluations || loadingTeachers || loadingStudents) {
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
    <Flex minHeight={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <Stack width="full" gap="5" mt={5} px={12}>
        <Heading size="xl" display={"flex"} justifyContent={"center"}>
          Listagem de avaliações de IMC
        </Heading>
        {!isAluno && (
          <Flex direction="column" alignItems="center" mt={5} w="100%">
            <Text fontWeight="bold" mb={4}>
              Filtrar por aluno {isAdmin && "e/ou professor"}
            </Text>

            <Flex
              w="100%"
              gap={4}
              flexWrap="wrap"
              justify="center"
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              {isAdmin && (
                <Skeleton
                  loading={loadingTeachers}
                  w={{ base: "80%", md: "30%" }}
                >
                  <Field.Root w="100%">
                    <Field.Label>Professor</Field.Label>
                    <NativeSelect.Root
                      onChange={(e) =>
                        setTeacherId((e.target as HTMLSelectElement).value)
                      }
                    >
                      <NativeSelect.Field
                        bg="white"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="gray.300"
                        w="100%"
                      >
                        <option key="default" value="">
                          Todos os professores
                        </option>
                        {teachers?.data.map((professor) => (
                          <option key={professor.id} value={professor.id}>
                            {professor.nome}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Skeleton>
              )}
              <Skeleton
                loading={loadingStudents}
                w={{ base: "80%", md: "30%" }}
              >
                <Field.Root w="100%">
                  <Field.Label>Aluno</Field.Label>
                  <NativeSelect.Root
                    onChange={(e) =>
                      setStudentId((e.target as HTMLSelectElement).value)
                    }
                  >
                    <NativeSelect.Field
                      bg="white"
                      color="black"
                      _placeholder={{ color: "gray.500" }}
                      borderColor="gray.300"
                      w="100%"
                    >
                      <option key="default" value="">
                        Todos os alunos
                      </option>
                      {students?.data.map((aluno) => (
                        <option key={aluno.id} value={aluno.id}>
                          {aluno.nome}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </Skeleton>

              <Flex width={"100%"} justifyContent={"center"}>
                <Button
                  colorPalette="green"
                  variant="surface"
                  w={{ base: "80%", md: "30%" }}
                  alignSelf="flex-end"
                  onClick={() => router.push("/bmi-evaluation/create")}
                >
                  <FaCirclePlus style={{ marginRight: "8px" }} />
                  Adicionar nova avaliação
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
        <Skeleton loading={loadingBmiEvaluations || isDeleteLoading}>
          <div style={{ overflowX: "auto" }}>
            <Table.Root size="md" variant="outline" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Professor</Table.ColumnHeader>
                  <Table.ColumnHeader>Aluno</Table.ColumnHeader>
                  <Table.ColumnHeader>Peso</Table.ColumnHeader>
                  <Table.ColumnHeader>Altura</Table.ColumnHeader>
                  <Table.ColumnHeader>IMC</Table.ColumnHeader>
                  <Table.ColumnHeader>Classificação</Table.ColumnHeader>
                  <Table.ColumnHeader>Data da avaliação</Table.ColumnHeader>
                  {!isAluno && (
                    <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                  )}
                  {userStorage?.perfil === "admin" && (
                    <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {bmiEvaluations?.data.map((bmiEvaluation) => (
                  <Table.Row key={bmiEvaluation.id}>
                    <Table.Cell>
                      {bmiEvaluation.usuarioAvaliador.nome}
                    </Table.Cell>
                    <Table.Cell>
                      {bmiEvaluation.usuarioAvaliado.nome}
                    </Table.Cell>
                    <Table.Cell>{bmiEvaluation.peso}</Table.Cell>
                    <Table.Cell>{bmiEvaluation.altura}</Table.Cell>
                    <Table.Cell>{bmiEvaluation.imc}</Table.Cell>
                    <Table.Cell>{bmiEvaluation.classificacao}</Table.Cell>
                    <Table.Cell>
                      {bmiEvaluation.dt_inclusao.toString()}
                    </Table.Cell>
                    {!isAluno && (
                      <Table.Cell>
                        <Button
                          colorPalette="blue"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/bmi-evaluation/edit/${bmiEvaluation.id}`
                            )
                          }
                        >
                          Editar
                        </Button>
                      </Table.Cell>
                    )}
                    {isAdmin && (
                      <Table.Cell>
                        <Modal
                          confirmFunc={() => onDelete(bmiEvaluation.id)}
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
            {bmiEvaluations?.data.length === 0 && (
              <Text textAlign={"center"} mt={10} mb={10} fontWeight={"bold"}>
                Nenhuma avaliação encontrada
              </Text>
            )}
            <Pagination.Root
              count={bmiEvaluations?.total}
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
      </Stack>
      <Footer />
    </Flex>
  );
}
