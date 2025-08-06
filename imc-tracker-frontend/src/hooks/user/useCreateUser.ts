import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";
import { createUser } from "@/services/user/createUser";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";

export function useCreateUser(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toaster.create({
        title: `Usuário criado com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao criar usuário, por favor tente novamente mais tarde";

      toaster.error({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
