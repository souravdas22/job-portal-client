import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const register = async (payload) => {
  try {
    console.log(payload)
    const response = await axiosInstance.post("/register",payload);
    return response?.data;
  } catch (error) {
     toast.error(error.message);
  }
};
