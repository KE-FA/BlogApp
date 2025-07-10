import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Header from "./components/header";
import Footer from "./components/footer";

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
        </Routes>
        {/* {!isHomePage && <Footer />} */}
        <Footer />

      
    </QueryClientProvider>
  );
}

export default App;
