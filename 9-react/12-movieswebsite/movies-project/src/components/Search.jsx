export function Search({ searchInput, handleSearchInput }) {
  return (
    <>
      <div className="search bg-dark-100 mx-auto my-10 w-full max-w-4xl rounded-xl p-5">
        <div className="inset-y-auto flex w-full flex-row gap-1">
          <img className="left-3" src="/search.svg" />
          <input
            className={
              "placeholder-light-200 w-full px-6 text-left text-gray-200 outline-hidden"
            }
            value={searchInput}
            placeholder="Search movies..."
            onChange={(event) => {
              handleSearchInput(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
