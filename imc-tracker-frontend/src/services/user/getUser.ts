import { User } from "@/common/interfaces/user/user.interface";
import axios from "axios";

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>(`http://localhost:3001/users/${id}`);
  return response.data;
};
