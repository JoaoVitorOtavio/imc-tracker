"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import Modal from "@/components/Modal";
import { useDeleteBmiEvaluation } from "@/hooks/bmiEvaluation/useDeleteBmiEvaluation";
import { useGetBmiEvaluations } from "@/hooks/bmiEvaluation/useGetBmiEvaluations";
import { useGetUsers } from "@/hooks/user/useGetUsers";
import {
  Button,
  ButtonGroup,
  Field,
  Heading,
  IconButton,
  NativeSelect,
  Pagination,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function ListBmiEvaluation() {
  const router = useRouter();

  const LIMIT = 15;

  const [page, setPage] = useState<number>(1);
  const [teacherId, setTeacherId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  const {
    data: bmiEvaluations,
    isLoading: loadingBmiEvaluations,
    error,
  } = useGetBmiEvaluations({
    page,
    limit: LIMIT,
    id_usuario_aluno: studentId,
    id_usuario_avaliacao: teacherId,
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
  }, [bmiEvaluations, error]);

  const onDelete = async (id: string) => {
    deleteBmiEvaluation(id);
  };

  return (
    <div>
      <Stack width="full" gap="5">
        <Heading size="xl">Products</Heading>
        <Text>Filtrar por aluno e/ou professor </Text>
        <Skeleton loading={loadingTeachers}>
          <Field.Root>
            <Field.Label>Professor</Field.Label>
            <NativeSelect.Root
              onChange={(e) =>
                setTeacherId((e.target as HTMLSelectElement).value)
              }
            >
              <NativeSelect.Field>
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
        <Skeleton loading={loadingStudents}>
          <Field.Root>
            <Field.Label>Aluno</Field.Label>
            <NativeSelect.Root
              onChange={(e) =>
                setStudentId((e.target as HTMLSelectElement).value)
              }
            >
              <NativeSelect.Field>
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
        <Skeleton loading={loadingBmiEvaluations || isDeleteLoading}>
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
                <Table.ColumnHeader textAlign="center"></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {bmiEvaluations?.data.map((bmiEvaluation) => (
                <Table.Row key={bmiEvaluation.id}>
                  <Table.Cell>{bmiEvaluation.usuarioAvaliador.nome}</Table.Cell>
                  <Table.Cell>{bmiEvaluation.usuarioAvaliado.nome}</Table.Cell>
                  <Table.Cell>{bmiEvaluation.peso}</Table.Cell>
                  <Table.Cell>{bmiEvaluation.altura}</Table.Cell>
                  <Table.Cell>{bmiEvaluation.imc}</Table.Cell>
                  <Table.Cell>{bmiEvaluation.classificacao}</Table.Cell>
                  <Table.Cell>
                    {bmiEvaluation.dt_inclusao.toString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      colorPalette="blue"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/bmi-evaluation/edit/${bmiEvaluation.id}`)
                      }
                    >
                      Editar
                    </Button>
                  </Table.Cell>
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
                </Table.Row>
              ))}
              {/* {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">{item.price}</Table.Cell>
              </Table.Row>
            ))} */}
            </Table.Body>
          </Table.Root>

          <Pagination.Root
            count={bmiEvaluations?.total}
            pageSize={LIMIT}
            page={page}
            onPageChange={(e) => setPage(e.page)}
          >
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
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
        </Skeleton>
      </Stack>
    </div>
  );
}
