import { Routes, Route } from "react-router-dom";
import Layout from "../../components/Layout";
import User from "../../components/Manager/User";
import Article from "../../components/Manager/Article";
import Author from "../../components/Manager/Author";

const Admin = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route element={<User />} path="manager-users" />
          <Route element={<Article />} path="manager-articles" />
          <Route element={<Author />} path="manager-authors" />
        </Routes>
      </Layout>
    </>
  );
};
export default Admin;
