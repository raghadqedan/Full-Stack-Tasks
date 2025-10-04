import { useParams, Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import { Spinner } from "../components/spinner";
import { v4 as uuidv4 } from 'uuid';
import  ReadMoreText from "../components/ReadMoreText";
export function MovieDetails(){
    const {id}=useParams();
    const [movie,setMovie]= useState(null);
    const [movieImages,setMovieImages]= useState(null);
      const [isLoading,setIsLoading]=useState(true);

    const API_URL=import.meta.env.VITE_API_URL;
    const API_KEY=import.meta.env.VITE_TDPM_API_KEY;
      const IMAGE_URL=import.meta.env.VITE_IMAGE_URL;


 async function fetchMovie(id){
     try {
        const endpoint=`${API_URL}movie/${id}?language=en-US`;
        const response= await axios.get(endpoint,
            {
                method:'GET',
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${API_KEY}`
                }
            }
            
        );
        const data=response.data;
       
        if(data){
         setMovie(data);
        console.log("movie",data)
  }
    } catch (error) {
        console.log(error)
    }
 }

 async function featchMovieImages(id){
   try {
    setIsLoading(true)

    const endpoint=`${API_URL}movie/${id}/images`;
    console.log(endpoint)
    const response=await axios.get(endpoint,
         {
                method:'GET',
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${API_KEY}`
                }
            }
    );
    if(response){
        console.log(response.data)
        setMovieImages(response.data);
        setIsLoading(false)
    }
   } catch (error) {
    console.log(error);
    
   }

 }




useEffect(()=>{
   fetchMovie(id);
   featchMovieImages(id);
   console.log(movie);
},[id])
  


    return <>
    <Link>
    <div className="movie-details-container  border-0 p-5 m-5  rounded-xl shadow-amber-100 shadow-2xl ">
        {/* title and rating  */}
    <div className={"title-and-rating flex flex-row  justify-between items-center  text-2xl flex-wrap "}>
        <div>
            <div className={"flex flex-row flex-wrap items-center"}>
                    <p>{movie?.title}</p>
                    <span className={'ml-2 text-sm text-amber-100'}>({movie?.status})</span>
            </div>
        
            <div className={'flex ml-3 flex-wrap'}>
             <p  className={"text-sm"}>{movie?.release_date?.split('-')[0]}</p>
             <p  className={"text-sm ml-3 capitalize"}>{movie?.original_language}</p>
            </div>

           

            
        </div>
        <span className={" flex flex-row items-center gap-2 flex-wrap"}>
            <img src='/star.png' className={'size-4'} />
            <p className={"text-xl"}>{movie?.vote_average}</p>
        </span>
    </div>
    {/* images */}
     <div className={"mt-5 w-full flex flex-row    gap-5 h-[400px] max-sm:h-[300px]  overflow-x-auto  "}>
       {movieImages?.backdrops[0]?.file_path?< img src={`${IMAGE_URL}w500/${movieImages?.backdrops[0]?.file_path }`} className={'rounded-lg w-1/4 max-md:w-1/2  max-sm:w-full h-full '}/>:isLoading?<div className={" w-1/4 max-md:w-1/2  max-sm:w-full mx-auto my-auto"}><Spinner/></div>:<div className={" w-1/3 max-md:w-1/2  max-sm:w-full justify-center my-auto "}><img src={"/public/No-Poster.png"} className={"h-[400px]  max-sm:h-[200px] w-full rounded-2xl "}/></div>} 
        {movieImages?.backdrops[1]?.file_path? <img src={`${IMAGE_URL}w500/${movieImages?.backdrops[1]?.file_path}`} className={'rounded-lg w-3/4 h-full max-md:w-1/2   max-sm:w-full '}/>:isLoading?<div className={" w-1/4 max-md:w-1/2  max-sm:w-full  mx-auto  my-auto "}><Spinner/></div>:<div className={"  w-2/3  max-md:w-1/2   max-sm:w-full justify-center my-auto"}><img src={"/public/No-Poster.png"} className={"h-[400px]   max-sm:h-[200px] w-full rounded-2xl  "}/></div>} 
        
  </div>
  {/* movie details info  */}
    <div className={' grid grid-cols-[300px_1fr] gap-4 mt-10 max-sm:gap-2 [@media(max-width:365px)]:grid-cols-1 max-sm:grid-cols-[1fr_1fr] justify-items-start  p-5 '}>
            <p className={'text-lg font-extralight '}>Geners</p>
            <div className={"flex flex-wrap max-sm:flex-col font-extralight "}>
                {
                movie?.genres?.map((m)=>{
                    return <span key={uuidv4()}  className={"text-sm w-[100px] m-2 bg-amber-300 p-1 rounded-sm font-normal" }>{m.name}</span>
                })}
            </div>
            <p className={'text-lg font-extralight  '}>Overview </p>
             <div className={"text-left  font-light"}> <ReadMoreText text={movie?.overview}/></div>
             <p className={'text-lg font-extralight'}>Release Date  </p>
             <div className={" font-light"}>{movie?.release_date}</div>
             <p className={'text-lg  text-left font-extralight'}>Countries</p>
             <div className={" text-left font-light"}>{movie?.production_countries.map((m)=>{
              return <span key={uuidv4()}>
                <span>.</span>
                <span className={""}>{m.iso_3166_1}</span>
              </span> 
             })}
             </div>

             <p className={'text-lg  text-left font-extralight'}>Language</p>
             <div className={"  text-left font-light"}>{movie?.spoken_languages.map((m)=>{
              return <span key={uuidv4()}>
                <span>.</span>
                <span >{m.english_name}</span>
              </span> 
             })}</div>
             <p className={'text-lg font-extralight'}>Budget</p>
             <div className={" font-light"}>$ {Math.round(movie?.budget/1_000_000)}M</div>
             <p className={'text-lg  text-left font-extralight'}>Revenue</p>
             <div className={"font-light"}>$ {Math.round(movie?.revenue/1000000)}M</div>
             <p className={'text-lg text-left font-extralight'}>Tagline</p>
             <div className={" font-light text-left"}>{movie?.tagline}</div>
             
             <p className={'text-lg  text-left font-extralight'}>Production Companies</p>
             <div className={"flex flex-wrap gap-3  font-light text-left"}>{movie?.production_companies?.map((m)=>{
              return <span key={uuidv4()}>
                <span className={"mr-1 "}>.</span>
                <span className={"mr-3 "}>{m.name}</span>
                
              </span> 
             })}</div>
       
            <div>

            </div>
            
        
    </div>

    </div>
    </Link>
    </>
}