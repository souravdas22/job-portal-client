import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const searchJob = async (searchItem) => {
  try {
    const response = await axiosInstance.get(
      `/job/category?category=${searchItem}`
    );
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
