
import './App.css'
import { Search } from './components/Search'
import { Spinner } from './components/spinner';
import { MovieCard } from './components/MovieCard';

import Trending from './components/trending.jsx';
import Home from './pages/Home.jsx';
import { MovieDetails } from './pages/MovieDetails.jsx';

//Routing 
import { BrowserRouter, Routes, Route } from "react-router-dom";




const API_key= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOThkMTIzMzJhOTdjNzkwNWM2MjVjMjkzZWU5OGU2YiIsIm5iZiI6MTc1OTI0MDU1My4yMDgsInN1YiI6IjY4ZGJlMTY5OTM2MTI4MzZmNmUxZDE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TVOGemkpmunQWwiSFx0Ns3-vfhIBMzLPd-mXroeO4DU';

const API_URL='https://api.themoviedb.org/3/';

function App() {
return <>

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
    </>
  
}

export default App
