

import { Search } from './Search.jsx';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { MovieCard } from './MovieCard.jsx';
import { useDebounced } from './useDebounced.js';
import {updateSearchCount,getTrending } from'../appwrite.js'
import Trending from './trending.jsx';



  const API_KEY=import.meta.env.VITE_TDPM_API_KEY;
const API_URL='https://api.themoviedb.org/3/';

function Home() {
  const [errorMessage,setErrorMessage]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [isTreandingLoading,setIsTreandingLoading]=useState(false);


  const [movies,setMovies]=useState([]);
  const [trendingMovies,setTrendingMovies]= useState([]);


  

  const [searchInput,setSearchInput]=useState("");
  const debouncedsearchInput=useDebounced(searchInput,500);
 const loadTrendingMovies= async ()=>{
  try{ 
    setIsTreandingLoading(true)
    const trendingMovies = await getTrending();
  setTrendingMovies(trendingMovies);
  setIsTreandingLoading(false)
}catch(error){
 
    console.log(error)
  }
 
 }


function handleSearchInput(value){
  setSearchInput(value)
}
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

async function fetchMovies(query=searchInput){
   try{
    console.log("deponce",query)
  setIsLoading(true);
  const endpoint=searchInput?`${API_URL}search/movie?query=${encodeURIComponent(query)}`:`${API_URL}discover/movie`
    const response=await axios.get(endpoint,
      {...options,params:{sort_by: "popularity.desc",include_adult:false}}
    )
    if(response.status==200){
     const data=await response.data;
     setMovies(data.results);
     if(query && data.results.length>0)
     updateSearchCount(query,data.results[0]);
      return ;
    }else{
      throw new Error("Failed Fetch Movies,please try again later.");
    }


   }catch(error){
     setErrorMessage(`${error.message}`);
   }finally{
    setIsLoading(false);
   }
}
useEffect( ()=>{
   loadTrendingMovies()
},[])
useEffect(()=>{
    fetchMovies(debouncedsearchInput);
   
},[debouncedsearchInput])

console.log(movies)
  return (
    <>
   <div className='pattern bg-hero-pattern w-full h-screen bg-center bg-cover flex justify-center'>
  <div className='wrapper w-full  flex flex-col mx-auto p-3 '>
    <div className='header sm:mt-10 mt-5 mx-auto w-full'>
      <img  className="mx-auto my-auto drop-shadow-md sm:w-lg max-sm:w-3/4  max-w-3xl rounded-2xl"    src='/public/imagee.jpg'/>
      <h1 className='text-5xl text-center max-w-4xl mx-auto sm:text-[64px]  max-sm:text-[30px] max-sm:mt-3 sm:leading-[76px] font-bold text-white xs:text-[40px] '>Find <span className='text-gradient'>Movies</span> Yo Will Enjoy Without Hassle</h1>
     <Search searchInput={searchInput}  handleSearchInput={handleSearchInput}/>
    </div>
     <div className='trending-movies'>
     <h1 className='mt-1 text-white text-3xl flex justify-start'>Trending Movies</h1>
     <hr className='h-0.5 border-0 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] m-5'/>
     <div className={' trending-wrapper relative   px-2 '} >


      {errorMessage?<p className='text-red-500'>{errorMessage}</p>:
      <ul className=' flex gap-6  w-full p-3  h-auto  overflow-x-auto  top-0 right-0 hide-scrollbar align-items-center'>
        {
        trendingMovies.map((m,index)=>(
<Trending key={m.$id

}  movie={m} isLoading={isTreandingLoading} index={index}/>       

  ))}

      </ul>}

      
     </div>
     
   </div>
     <div className='all-movies mt-1  '>
     <h1 className=' text-white text-3xl flex justify-start  '>All Movies</h1>
     <hr className='h-0.5 border-0 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] m-5'/>
     <div className={'flex justify-center'} >
      {
      errorMessage?<p className='text-red-500'>{errorMessage}</p>:
      <ul className='grid gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 '>
        {
        movies.map((m)=>(
<MovieCard key={m.id}  movie={m} isLoading={isLoading}    />    ))}

      </ul>}
     </div>
     
   </div>
  
    </div>    
   </div>
  
    </>
  )
}

export default Home
