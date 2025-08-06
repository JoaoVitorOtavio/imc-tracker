"use client";

import { useForm } from "react-hook-form";
import { Button, Card, Field, Flex, Input, Stack } from "@chakra-ui/react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

type TLogin = {
  usuario: string;
  senha: string;
};

export default function Login() {
  const router = useRouter();

  function onLoginSuccess() {
    router.replace("/bmi-evaluation/list");
  }
  const { mutate: login, isPending } = useLogin(onLoginSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();

  return (
    <Flex height={"100vh"} align={"center"} justify={"center"}>
      <Card.Root maxW="lg" width={"100%"}>
        <form onSubmit={handleSubmit((data) => login(data))}>
          <Card.Header alignItems={"center"}>
            <Card.Title fontSize={"2xl"} fontWeight={600}>
              Login
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
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
                <Input
                  id="senha"
                  placeholder="Senha"
                  type="password"
                  {...register("senha", {
                    required: "Este campo é obrigatório",
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
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="center">
            <Button
              loading={isPending}
              type="submit"
              size="sm"
              width={"40%"}
              variant="solid"
              loadingText="Entrando..."
            >
              Entrar
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Flex>
  );
}
