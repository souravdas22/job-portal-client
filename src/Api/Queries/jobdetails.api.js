import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const getJobDetails = async (id) => {
    try {
      const response = await axiosInstance.get(
      `/job/details/${id}`
    );
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
