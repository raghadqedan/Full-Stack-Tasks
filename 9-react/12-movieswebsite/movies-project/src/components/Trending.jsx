import { Spinner } from "./spinner"
import { Link } from "react-router-dom"
export default function Trending({movie:{$id,
movie_id,
poster_url,
},isLoading,index

}){
console.log(poster_url)
          return isLoading?<div className="movie-card  w-[300px] max-sm:w-full bg-dark-100 p-1 rounded-2xl shadow-inner shadow-light-100/10 min-h-[250px] flex justify-center items-center ">
            <Spinner/>
          </div>:(
            <Link to={`/movie/${movie_id}`} className={"flex-shrink-0"}>
            <div className="trending-card   flex-shrink-0   flex flex-row rounded-2xl  cursor-pointer align-items-center w-[222px]  max-sm:w-full   ">
    <p className={"  fancy-text text-dark-100 max-sm:text-[110px] "}>
    {index+1}
</p>

<img className={"lg:w-[175px] max-sm:w-full max-sm:h-[200px] h-[250px] object-cover  rounded-xl z-5 -m-3.5  hover:shadow-2xl hover:scale-105 hover: shadow-light-100 transition-all duration-300 box-shadow"} src={!poster_url.includes("null")?poster_url:'/public/000000H1.jpg'}></img>






</div>
</Link>

          )

}