import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Protected from "./components/protected"
import NewBlog from "./Pages/newBlog";
import AllBlogs from "./Pages/allBlogs"
import Trash from "./Pages/trash"
import Profile from "./Pages/profile"


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {

  // const isHomePage = location.pathname === "/" ;

  return (
    
    <QueryClientProvider client={client}>
    
        {/* {!isHomePage && <Header />} */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs">
            <Route 
             path=""
             element={
              <Protected>
               <AllBlogs />
              </Protected>
            }
          />
          <Route
            path="new"
            element={
              <Protected>
                <NewBlog />
              </Protected>
            }
          />

          <Route
            path = "/trash"
            element={
              <Protected>
                <Trash />
              </Protected>
            }
            />

            <Route
            path = "/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
            />

          </Route>
        </Routes>
        {/* {!isHomePage && <Footer />} */}
        <Footer />

      
    </QueryClientProvider>
  );
}

export default App;
