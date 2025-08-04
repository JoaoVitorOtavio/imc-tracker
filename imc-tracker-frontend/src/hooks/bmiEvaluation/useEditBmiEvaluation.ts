import { EditBmiEvaluation } from "@/common/interfaces/bmi-evaluation/edit-bmi-evaluation.interface";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { editBmiEvaluation } from "@/services/bmiEvaluation/editBmiEvaluation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useEditBmiEvaluation() {
  return useMutation({
    mutationFn: ({
      id,
      bmiEvaluation,
    }: {
      id: string;
      bmiEvaluation: EditBmiEvaluation;
    }) => editBmiEvaluation(id, bmiEvaluation),
    onSuccess: () => {
      toaster.create({
        title: `Avaliação de IMC editada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao editar avaliação de IMC, por favor tente novamente mais tarde";

      toaster.create({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
