import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: AuthHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: AuthHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: AuthHeader() });
};

const DataService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default DataService;
