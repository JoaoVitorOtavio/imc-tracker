import { EditUser } from "@/common/interfaces/user/edit-user.intercace";
import axios from "axios";

export const editUser = async (id: string, user: EditUser) => {
  return axios.put(`http://localhost:3001/users/${id}`, user);
};
