/* eslint-disable @typescript-eslint/no-unused-vars */
import { TEN_MINUTES_IN_MS } from "@/common/constants";
import { Perfil } from "@/common/enums/perfil.enum";
import { Users } from "@/common/interfaces/user/users.interface";
import { getUsers } from "@/services/user/getUsers";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers({
  page,
  limit,
  role,
  nameOrUsername,
}: {
  page?: number;
  limit?: number;
  role?: Perfil;
  nameOrUsername?: string;
}) {
  return useQuery<Users>({
    queryKey: ["users", page, limit, role, nameOrUsername],
    queryFn: async ({ queryKey }) => {
      const [_key, page, limit, role] = queryKey as [
        string,
        number,
        number,
        Perfil,
        string
      ];
      const response = await getUsers(page, limit, role, nameOrUsername);

      return response;
    },
    placeholderData: (prev) => prev,
    staleTime: TEN_MINUTES_IN_MS,
  });
}
