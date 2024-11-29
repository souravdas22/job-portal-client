import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const getUserDetails = async (token) => {
  try {
    const response = await axiosInstance.get(`/profile-details/${token}`);
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateUserDetails = async ({user,id}) => {
  try {
    const response = await axiosInstance.post(
      `/profile-details/update/${id}`,
      user
    );
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updatePassword = async ({ newPass, email }) => {
  try {
    console.log(newPass, email);
    const response = await axiosInstance.post(
      `/update-password/${email}`,
      newPass
    );
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
