import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";
import { createUser } from "@/services/user/createUser";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toaster.create({
        title: `Usuário criado com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });
      console.log("DDATA CREATE USER", data);
      // TODO: salvar em um global state
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao criar usuário, por favor tente novamente mais tarde";

      toaster.create({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
