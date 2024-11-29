import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const login = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.post("/login", payload);
    return response?.data;
  } catch (error) {
     toast.error(error.response.data.message);
  }
};
