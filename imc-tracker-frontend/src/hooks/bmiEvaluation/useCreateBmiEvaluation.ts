import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { createBmiEvaluation } from "@/services/bmiEvaluation/createBmiEvaluation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateBmiEvaluation() {
  return useMutation({
    mutationFn: createBmiEvaluation,
    onSuccess: () => {
      toaster.create({
        title: `Avaliação de IMC criada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao criar avaliação de IMC, por favor tente novamente mais tarde";

      toaster.error({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
