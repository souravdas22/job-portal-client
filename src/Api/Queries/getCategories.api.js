import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const getCategories = async () => {
  try {
      const response = await axiosInstance.get("job/categories");
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const filterByCategory = async (category) => {
    try {
        console.log(category)
    const response = await axiosInstance.get(
      `/job/category?category=${category}`
    );
    return response?.data;
  } catch (error) {
    toast.error(error.message);
  }
};
