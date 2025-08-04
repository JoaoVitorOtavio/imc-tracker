import { BmiEvaluation } from "@/common/interfaces/bmi-evaluation/bmi-evaluation.interface";
import { getBmiEvaluation } from "@/services/bmiEvaluation/getBmiEvaluation";
import { useQuery } from "@tanstack/react-query";

export function useGetBmiEvaluation(bmiEvaluationId: string) {
  return useQuery<BmiEvaluation | null>({
    queryKey: ["bmiEvaluation", bmiEvaluationId],
    queryFn: () => getBmiEvaluation(bmiEvaluationId),
    enabled: !!bmiEvaluationId,
    retry: 2,
  });
}
