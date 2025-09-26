import { axiosInstance } from "../lib/axios";

export const AuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    const result = res.data;
    return result;
  } catch (error) {
    console.log(`Error happened While getting AuthUser ${error}`);
    return null;
  }
};

export const SignUp = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const LogIn = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  const result = res.data;
  return result;
};

export const LogOut = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAllEducationPosts = async () => {
  const res = await axiosInstance.get("/all/education");
  return res.data;
};
export const getAllHotspots = async () => {
  const res = await axiosInstance.get("/all/hotspot");
  return res.data;
};
export const getAllReports = async () => {
  const res = await axiosInstance.get("/all/report");
  return res.data;
};

export const createEducationPost = async (data) => {
  const res = await axiosInstance.post("/admin/create/education", data);
  return res.data;
};

export const createHotspot = async (data) => {
  const res = await axiosInstance.post("/admin/create/hotspot", data);
  return res.data;
};

export const createReport = async (data) => {
  const res = await axiosInstance.post("/admin/create/report", data);
  return res.data;
};

export const editHotspot = async (id, data) => {
  const res = await axiosInstance.put(`/admin/edit/hotspot/${id}`, data);
  return res.data;
};

export const editReport = async (id, data) => {
  const res = await axiosInstance.put(`/admin/edit/report/${id}`, data);
  return res.data;
};

export const deleteEducationPost = async (id) => {
  const res = await axiosInstance.delete(`/admin/delete/education/${id}`);
  return res.data;
};

export const deleteHotspot = async (id) => {
  const res = await axiosInstance.delete(`/admin/delete/hotsport/${id}`);
  return res.data;
};

export const deleteReport = async (id) => {
  const res = await axiosInstance.delete(`/admin/delete/report/${id}`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/admin/all/users");
  return res.data;
}