import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { createBmiEvaluation } from "@/services/bmiEvaluation/createBmiEvaluation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateBmiEvaluation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBmiEvaluation,
    onSuccess: () => {
      toaster.create({
        title: `Avaliação de IMC criada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["bmiEvaluations"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
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
