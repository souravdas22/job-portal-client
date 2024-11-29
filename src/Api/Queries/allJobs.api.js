import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const getJobs = async () => {
  try {
    const response = await axiosInstance.get("/jobs");
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
