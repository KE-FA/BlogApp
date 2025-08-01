import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/MyRegister";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Protected from "./components/Protected";


import NewBlog from "./Pages/Newblog";
import AllBlogs from "./Pages/MyAllblogs";
import UpdateBlog from "./Pages/MyUpdateblog";
import Profile from "./Pages/Profile";
import MyBlogs from "./Pages/Blogs";
import BlogDetails from "./Pages/Blogdetails";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/blogs"
          element={
            <Protected>
              <AllBlogs />
            </Protected>
          }
        ></Route>

        <Route
          path="/blogs/new"
          element={
            <Protected>
              <NewBlog />
            </Protected>
          }
        />

        <Route
          path="/blogs/myBlogs"
          element={
            <Protected>
              <MyBlogs />
            </Protected>
          }
        />

        <Route
          path="/user/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/blogs/update/:blogId"
          element={
            <Protected>
              <UpdateBlog />
            </Protected>
          }
        ></Route>

        <Route path="/blogs/blog/:id" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
