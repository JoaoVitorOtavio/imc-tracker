import { EditBmiEvaluation } from "@/common/interfaces/bmi-evaluation/edit-bmi-evaluation.interface";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { editBmiEvaluation } from "@/services/bmiEvaluation/editBmiEvaluation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useEditBmiEvaluation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bmiEvaluation,
    }: {
      id: string;
      bmiEvaluation: EditBmiEvaluation;
    }) => editBmiEvaluation(id, bmiEvaluation),
    onSuccess: (_data, variables) => {
      const { id } = variables;

      toaster.create({
        title: `Avaliação de IMC editada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["bmiEvaluations"] });
      queryClient.invalidateQueries({
        queryKey: ["bmiEvaluation", id],
      });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao editar avaliação de IMC, por favor tente novamente mais tarde";

      toaster.error({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
