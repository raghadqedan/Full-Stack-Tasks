export function Search({searchInput,handleSearchInput}){
    return <>
<div className="search mx-auto p-5 bg-dark-100 rounded-xl w-full my-10 max-w-4xl ">
    <div className="flex flex-row gap-1 inset-y-auto w-full">
        <img  className=" left-3   " src="/search.svg"/>
       <input
       className={"px-6 text-gray-200 placeholder-light-200 outline-hidden text-left w-full"}
        value={searchInput}
         placeholder="Search movies..."
       onChange={(event)=>{handleSearchInput(event.target.value)}}
       />
    </div>
</div>

    </>
}