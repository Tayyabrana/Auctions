import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

const commissioned = {
        getcommissioned: async () => {
          try {
            const response = await axiosInstance.get("/artwork/commision/all", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auction-jwt-token")}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
          }
        },
  approve: async (id) => {
    try {
      const response = await axiosInstance.get(`/artwork/commision/approve/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auction-jwt-token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error approving artwork:", error);
      throw error;
    }
  },
  reject: async (id) => {
    try {
      const response = await axiosInstance.get(`/artwork/commision/reject/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auction-jwt-token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting artwork:", error);
      throw error;
    }
  },
};

export default commissioned;
