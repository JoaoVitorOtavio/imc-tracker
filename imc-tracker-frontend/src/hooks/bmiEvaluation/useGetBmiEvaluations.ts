/* eslint-disable @typescript-eslint/no-unused-vars */
import { TEN_MINUTES_IN_MS } from "@/common/constants";
import { BmiEvaluations } from "@/common/interfaces/bmi-evaluation/bmi-evaluations.interface";
import { getBmiEvaluations } from "@/services/bmiEvaluation/getBmiEvaluations";
import { useQuery } from "@tanstack/react-query";

export function useGetBmiEvaluations({
  page,
  limit,
  id_usuario_aluno,
  id_usuario_avaliacao,
}: {
  page: number;
  limit: number;
  id_usuario_aluno?: string;
  id_usuario_avaliacao?: string;
}) {
  return useQuery<BmiEvaluations>({
    queryKey: [
      "bmiEvaluations",
      page,
      limit,
      id_usuario_aluno,
      id_usuario_avaliacao,
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, page, limit, id_usuario_aluno, id_usuario_avaliacao] =
        queryKey as [string, number, number, string?, string?];

      return getBmiEvaluations(
        page,
        limit,
        id_usuario_aluno,
        id_usuario_avaliacao
      );
    },
    placeholderData: (prev) => prev,
    staleTime: TEN_MINUTES_IN_MS,
  });
}
