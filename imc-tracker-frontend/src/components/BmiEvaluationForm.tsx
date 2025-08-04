"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import { CreateBmiEvaluation } from "@/common/interfaces/bmi-evaluation/create-bmi-evaluation.interface";
import { useCreateBmiEvaluation } from "@/hooks/bmiEvaluation/useCreateBmiEvaluation";
import { useGetUsers } from "@/hooks/user/useGetUsers";
import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  NativeSelect,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BmiEvaluation as IBmiEvaluation } from "@/common/interfaces/bmi-evaluation/bmi-evaluation.interface";
import { useEditBmiEvaluation } from "@/hooks/bmiEvaluation/useEditBmiEvaluation";
import { EditBmiEvaluation } from "@/common/interfaces/bmi-evaluation/edit-bmi-evaluation.interface";
import { useRouter } from "next/navigation";

export default function BmiEvaluation({
  isEdit,
  bmiEvaluation,
}: {
  isEdit?: boolean;
  bmiEvaluation?: IBmiEvaluation;
}) {
  const router = useRouter();

  function onEditSuccess() {
    router.replace("/bmi-evaluation/list");
  }

  const { mutate: createBmiEvaluation, isPending: isCreateLoading } =
    useCreateBmiEvaluation();

  const { mutate: editBmiEvaluation, isPending: isEditLoading } =
    useEditBmiEvaluation(onEditSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateBmiEvaluation | EditBmiEvaluation>({
    defaultValues: {
      id_usuario_avaliacao: bmiEvaluation?.id_usuario_avaliacao || "",
      id_usuario_aluno: bmiEvaluation?.id_usuario_aluno || "",
      peso: bmiEvaluation?.peso || 0,
      altura: bmiEvaluation?.altura || 0,
    },
  });

  const { data: teachers, isLoading: loadingTeachers } = useGetUsers({
    role: Perfil.PROFESSOR,
  });

  const { data: students, isLoading: loadingStudents } = useGetUsers({
    role: Perfil.ALUNO,
  });

  const selectedTeacher = watch("id_usuario_avaliacao");
  const selectedStudent = watch("id_usuario_aluno");

  return (
    <Flex
      height={"100vh"}
      align={"center"}
      justify={"center"}
      style={{ backgroundColor: "red" }}
    >
      <Card.Root maxW="lg" width={"100%"}>
        <Skeleton loading={loadingTeachers || loadingStudents}>
          <form
            onSubmit={handleSubmit((data) =>
              isEdit
                ? editBmiEvaluation({
                    id: bmiEvaluation?.id as string,
                    bmiEvaluation: data as EditBmiEvaluation,
                  })
                : createBmiEvaluation(data as CreateBmiEvaluation)
            )}
          >
            <Card.Header alignItems={"center"}>
              <Card.Title fontSize={"2xl"} fontWeight={600}>
                {isEdit ? "Edição" : "Cadastro"} de Avaliação de IMC
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root>
                  <Field.Label>Professor</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("id_usuario_avaliacao", {
                        required: "Campo obrigatório",
                        validate: (value) =>
                          value !== "default" ||
                          "Selecione um professor válido",
                      })}
                    >
                      {selectedTeacher !== "default" &&
                      selectedTeacher ? null : (
                        <option key="default" value="default">
                          Selecione um professor...
                        </option>
                      )}
                      {teachers?.data.map((professor) => (
                        <option key={professor.id} value={professor.id}>
                          {professor.nome}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  {errors.id_usuario_avaliacao && (
                    <Text
                      color="red.500"
                      fontWeight={600}
                      fontSize="small"
                      mt="1"
                    >
                      {errors.id_usuario_avaliacao.message}
                    </Text>
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Aluno</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("id_usuario_aluno", {
                        required: "Campo obrigatório",
                        validate: (value) =>
                          value !== "default" || "Selecione um aluno válido",
                      })}
                    >
                      {selectedStudent !== "default" &&
                      selectedStudent ? null : (
                        <option key="default" value="default">
                          Selecione um aluno...
                        </option>
                      )}
                      {students?.data.map((aluno) => (
                        <option key={aluno.id} value={aluno.id}>
                          {aluno.nome}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  {errors.id_usuario_aluno && (
                    <Text
                      color="red.500"
                      fontWeight={600}
                      fontSize="small"
                      mt="1"
                    >
                      {errors.id_usuario_aluno.message}
                    </Text>
                  )}
                </Field.Root>
                <Field.Root invalid={errors.altura ? true : false}>
                  <Field.Label>Altura</Field.Label>
                  <Input
                    id="altura"
                    type="number"
                    step="0.01"
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "," || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    {...register("altura", {
                      required: "Altura é obrigatório",
                      min: {
                        value: 0.01,
                        message: "Altura deve ser maior que zero",
                      },
                      valueAsNumber: true,
                    })}
                  />
                  <Field.ErrorText>
                    {errors.altura && errors.altura.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.peso ? true : false}>
                  <Field.Label>Peso</Field.Label>
                  <Input
                    id="peso"
                    type="number"
                    step="0.01"
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "," || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    {...register("peso", {
                      required: "Peso é obrigatório",
                      min: {
                        value: 0.01,
                        message: "Peso deve ser maior que zero",
                      },
                      valueAsNumber: true,
                    })}
                  />
                  <Field.ErrorText>
                    {errors.peso && errors.peso.message}
                  </Field.ErrorText>
                </Field.Root>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="center">
              <Button
                size="sm"
                width={"40%"}
                variant="solid"
                colorPalette={"red"}
                onClick={() => router.replace("/bmi-evaluation/list")}
              >
                Cancelar
              </Button>
              <Button
                colorPalette={"blue"}
                loading={isEdit ? isEditLoading : isCreateLoading}
                type="submit"
                size="sm"
                width={"40%"}
                variant="solid"
              >
                {isEdit ? "Editar" : "Cadastrar"}
              </Button>
            </Card.Footer>
          </form>
        </Skeleton>
      </Card.Root>
    </Flex>
  );
}
