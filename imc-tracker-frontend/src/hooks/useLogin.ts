import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toaster.create({
        title: `Login feito com sucesso`,
        type: "success",
        duration: 3000,
        closable: true,
      });
      console.log("DATA LOGIN", data);
      // TODO: Salvar token dependendo de qual logica eu irei usar
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao fazer login, por favor tente novamente mais tarde";

      toaster.create({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
