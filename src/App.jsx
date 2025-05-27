import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";

import NotFound from "./pages/NotFound";
import NavbarPage from "./pages/Navbar";
import BackToTopButton from "./pages/BackToTop";
import Genres from "./pages/Genres";
import MediaDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";

export default function App() {
 return <>
 
 <BrowserRouter>
 <NavbarPage/>
 
 <Routes>
    
  <Route path="/" element={<HomePage/>}/>,
  <Route path="favorites" element={<Favorites/>}/>,
  <Route path="/:type/:id" element={<MovieDetail/>}/>,
  <Route path="genre/:id" element={<Genres/>}/>,
<Route path="/:type/:id" element={<MediaDetail />} />


  <Route path="*" element={<NotFound/>}/>,
 </Routes>
 <BackToTopButton/>
 </BrowserRouter>
 </>
}
