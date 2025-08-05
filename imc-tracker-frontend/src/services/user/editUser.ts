import { EditUser } from "@/common/interfaces/user/edit-user.intercace";
import { customAxios } from "@/utils/apis/CustomAxios";

export const editUser = async (id: string, user: EditUser) => {
  const response = await customAxios.put(`/users/${id}`, user, {
    withCredentials: true,
  });

  return response;
};
