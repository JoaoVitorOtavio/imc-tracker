"use client";

import { Perfil } from "@/common/enums/perfil.enum";
import { Situacao } from "@/common/enums/situacao.enum";
import { CreateUser } from "@/common/interfaces/user/create-user.interface";
import { useCreateUser } from "@/hooks/user/useCreateUser";
import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./ui/password-input";
import { User } from "@/common/interfaces/user/user.interface";
import { EditUser } from "@/common/interfaces/user/edit-user.intercace";
import { useEditUser } from "@/hooks/user/useEditUser";
import { useRouter } from "next/navigation";

export default function UserForm({
  isEdit,
  user,
}: {
  isEdit?: boolean;
  user?: User;
}) {
  const router = useRouter();

  function onEditSuccess() {
    router.replace("/user/list");
  }

  const { mutate: createUser, isPending: isCreateLoading } = useCreateUser();
  const { mutate: editUser, isPending: isEditLoading } =
    useEditUser(onEditSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUser | CreateUser>({
    defaultValues: {
      nome: user?.nome || "",
      usuario: user?.usuario || "",
      perfil: user?.perfil || Perfil.ADMIN,
      situacao: user?.situacao || Situacao.ATIVO,
    },
  });

  return (
    <Flex align={"center"} justify={"center"} py={10}>
      <Card.Root maxW="lg" width={"100%"} shadow={"lg"}>
        <form
          onSubmit={handleSubmit((data) =>
            isEdit
              ? editUser({ id: user?.id as string, user: data as EditUser })
              : createUser(data as CreateUser)
          )}
        >
          <Card.Header alignItems={"center"}>
            <Card.Title fontSize={"2xl"} fontWeight={600}>
              {isEdit ? "Edição" : "Cadastro"} de usuário
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field.Root invalid={errors.nome ? true : false}>
                <Field.Label>Nome</Field.Label>
                <Input
                  id="nome"
                  placeholder="Nome"
                  {...register("nome", {
                    maxLength: {
                      value: 60,
                      message: "O nome deve ter no máximo 60 caracteres",
                    },
                    required: "Este campo é obrigatório",
                  })}
                />
                <Field.ErrorText>
                  {errors.nome && errors.nome.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.usuario ? true : false}>
                <Field.Label>Usuário</Field.Label>
                <Input
                  id="usuario"
                  placeholder="Usuário"
                  {...register("usuario", {
                    required: "Este campo é obrigatório",
                  })}
                />
                <Field.ErrorText>
                  {errors.usuario && errors.usuario.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.senha ? true : false}>
                <Field.Label>Senha</Field.Label>
                <PasswordInput
                  id="senha"
                  placeholder="Senha"
                  type="password"
                  {...register("senha", {
                    required: isEdit ? false : "Este campo é obrigatório",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.senha && errors.senha.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root>
                <Field.Label>Perfil</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    {...register("perfil", { required: "Campo obrigatório" })}
                  >
                    {Object.entries(Perfil).map(([key, value]) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>Situação</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    {...register("situacao", {
                      required: "Campo obrigatório",
                    })}
                  >
                    {Object.entries(Situacao).map(([key, value]) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="center">
            <Button
              size="sm"
              width={"40%"}
              variant="solid"
              colorPalette={"red"}
              onClick={() => router.replace("/user/list")}
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
      </Card.Root>
    </Flex>
  );
}
