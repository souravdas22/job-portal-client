import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const sumbitJobApplication = async (formData) => {
  try {
    const response = await axiosInstance.post(`/application/create`,formData);
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getAllApplications = async () => {
  try {
      const response = await axiosInstance.get(`/applications`);
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};


