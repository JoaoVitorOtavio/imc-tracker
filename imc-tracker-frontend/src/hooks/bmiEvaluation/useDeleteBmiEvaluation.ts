import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { deleteBmiEvaluation } from "@/services/bmiEvaluation/deleteBmiEvaluation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useDeleteBmiEvaluation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBmiEvaluation(id),
    onSuccess: () => {
      toaster.create({
        title: `Avaliação de IMC deletada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["bmiEvaluations"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao deletar avaliação de IMC, por favor tente novamente mais tarde";

      toaster.error({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
