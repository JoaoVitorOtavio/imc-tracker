import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user/getUser";
import { User } from "@/common/interfaces/user/user.interface";

export function useGetUser(userId: string) {
  return useQuery<User | null>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    retry: 2,
  });
}
