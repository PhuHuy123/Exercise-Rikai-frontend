import axios from "../axios";

const loginUser = (data) => {
  return axios.put(`/user/login`, data);
};

const addUser = (data) => {
  return axios.post(`/user`, data);
};

const addAArticle = (data) => {
  return axios.post(`/article`, data);
};

const addAuthor = (data) => {
  return axios.post(`/author`, data);
};

const getAllUsers = () => {
  return axios.get(`/user`);
};
const getAllArticles = () => {
  return axios.get(`/article`);
};
const getAllAuthors = () => {
  return axios.get(`/author`);
};

const postAuthor = (data) => {
  return axios.post(`/author`, data);
};

const deleteUser = (id) => {
  return axios.delete(`/user/${id}`);
};
const deleteAuthor = (id) => {
  return axios.delete(`/author/${id}`);
};
const deleteArticle = (id) => {
  return axios.delete(`/article/${id}`);
};

export {
  loginUser,
  postAuthor,
  getAllUsers,
  addUser,
  getAllArticles,
  getAllAuthors,
  addAArticle,
  addAuthor,
  deleteUser,
  deleteArticle,
  deleteAuthor,
};
