import { Spinner } from "./spinner"
import { Link } from "react-router-dom";
export function MovieCard({movie:{id,title,
vote_average,
original_language,
release_date,
poster_path,
},isLoading

}){
  const IMAGE_URL=import.meta.env.VITE_IMAGE_URL;

          return isLoading?<div className="movie-card  sm:w-full  sm:mx-3  bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 min-h-[300px] flex justify-center items-center ">
            <Spinner/>
          </div>:(
            <Link to={`/movie/${id}`}>
          {console.log(id)}
          <div className="movie-card  sm:w-full  sm:mx-3 xs:max-w-xs  bg-dark-100 p-5 rounded-2xl shadow-inner  hover:shadow-2xl hover:shadow-light-100/30 min-h-[400px]  hover:scale-102  transition-all duration-300 ">
<img className={"h-70   w-full contain"}  src={ poster_path?`
${IMAGE_URL}w500/${poster_path}`:"./No-Poster.png"}/>
<div className="card-content mt-2 flex  flex-col flex-wrap ">
    <h3 className="flex justify-start">{title}</h3>
    <div className="rating mt-2 flex flex-wrap">
        <div className="flex  my-auto gap-1 ">
            <img  className="size-4 my-auto rounded-2xl" src={'./star.png'} alt="start icon "/>
        <p className="mr-2  font-medium">{vote_average?vote_average.toFixed(1):"N/A"}</p></div>
        
   
      <div className="flex  flex-wrap ">
        <div className={"flex "}> <span className="mr-1">.</span>
        <p className="mr-3 font-medium capitalize">{original_language}</p></div>
         
         <div className={"flex"}> <span className="mr-1 text-sm text-gray-100">.</span>
        <p className="mr-1  font-medium">{release_date?release_date.split('-')[0]:"N/A"}</p></div>
      </div>

    </div>


</div>




</div>
</Link>

          )

}