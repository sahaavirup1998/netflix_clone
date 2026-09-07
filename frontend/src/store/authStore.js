import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "https://netflix-clone-dsji.onrender.com/api/users";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

// signup
  signup: async (username, email, password) => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/signup`,
        {
          username,
          email,
          password,
        },
      );

      const data = response.data;

      set({
        user: data.user,
        isLoading: false,
        message: data.message,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to sign up";

      set({
        error: errorMessage,
        isLoading: false,
        message: null,
      });

      // Important!
      // This prevents redirect on error
      throw new Error(errorMessage);
    }
  },

// SIGNIN
  signin: async (email, password) => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/signin`,
        {
          email,
          password,
        },
      );

      const data = response.data;

      set({
        user: data.user,
        isLoading: false,
        message: data.message,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to log in";

      set({
        error: errorMessage,
        isLoading: false,
        message: null,
      });

      throw new Error(errorMessage);
    }
  },

  fetchUser: async () => {
    set({
      fetchingUser: true,
      error: null,
    });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetch-user`,
      );
      const data = response.data;

      set({
        user: data.user,
        fetchingUser: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch user";

      set({
        error: errorMessage,
        fetchingUser: false,
      });
    }
  },

// LOGOUT
  logout: async () => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
      );

      const data = response.data;

      set({
        user: null,
        isLoading: false,
        message: data.message,
        error: null,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to log out";

      set({
        error: errorMessage,
        isLoading: false,
        message: null,
      });

      throw new Error(errorMessage);
    }
  },

}));

export default useAuthStore;
