import { CreateUser } from "@/common/interfaces/user/create-user.interface";
import axios from "axios";

export const createUser = async (user: CreateUser) => {
  return axios.post("http://localhost:3001/users", user);
};
