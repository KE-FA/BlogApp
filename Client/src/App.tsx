import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Protected from "./components/protected";


import NewBlog from "./Pages/newBlog";
import AllBlogs from "./Pages/allBlogs";
import UpdateBlog from "./Pages/updateBlog";
import Profile from "./Pages/profile";
import MyBlogs from "./Pages/myBlogs";
import BlogDetails from "./Pages/blogDetails";
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
