import axios from "axios";

export const deleteUser = async (id: string) => {
  return axios.delete(`http://localhost:3001/users/${id}`);
};
