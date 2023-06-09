import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/user";
import { toast } from "react-toastify";
import i18next from "i18next";

export const registerUser = createAsyncThunk(
  // Нужен для создания асинхронных запросов
  "user/registerUser", // Название действия
  async (data) => {
    const user = await register(data);
    return user;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const user = await login(data);
  return user;
});

const setUser = (state, payload) => {
  const entries = Object.entries(payload);
  for (const [key, value] of entries) {
    state[key] = value;
  }
};

const initialState = {
  access: "employee",
  department: "",
  isActive: false,
  name: "",
  password: "",
  post: "",
  secondName: "",
  thirdName: "",
  username: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setUser(state, payload);
        toast.success(i18next.t("success.register"));
      })
      .addCase(registerUser.rejected, (_state, { error }) => {
        if (error.code === "409") {
          toast.error(i18next.t("errors.exist"));
        }
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        setUser(state, payload);
        localStorage.setItem("username", payload.username);
        localStorage.setItem("password", payload.password);
      })
      .addCase(loginUser.rejected, (_state, { error }) => {
        if (error.code === "403") {
          toast.error(i18next.t("errors.activate"));
        } else if (error.code === "404") {
          toast.error(i18next.t("errors.auth"));
        }
      });
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
