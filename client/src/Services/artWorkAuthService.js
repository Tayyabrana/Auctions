import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

const artWorkAuthService = {
    
  createArtWorkAuth: async (body) => {
    try {
      const response = await axiosInstance.post(
        "/artwork/auth/register",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auction-jwt-token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  createcommissionArt: async (body) => {
    console.log('body' , body);
    try {
      const response = await axiosInstance.post(
        "/artwork/commision/register",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auction-jwt-token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};
export default artWorkAuthService;
