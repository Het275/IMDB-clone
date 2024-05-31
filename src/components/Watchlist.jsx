import React, { useContext, useEffect, useState } from "react";
import genreId from "../Utility/genre";
import { ContextPath } from "./ContextPath";

function Watchlist() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const { watchlist, setWatchList } = useContext(ContextPath);

  const handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("data", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("data");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  const handleGenre = (gen) => {
    setCurrGenre(gen);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortingIncreased = () => {
    const sortedIncreasing = watchlist.sort((moviesA, moviesB) => {
      return moviesA.vote_average - moviesB.vote_average;
    });

    setWatchList([...sortedIncreasing]);
  };

  const sortingDecreased = () => {
    const sortedDecreasing = watchlist.sort((moviesA, moviesB) => {
      return moviesB.vote_average - moviesA.vote_average;
    });

    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    const temp = watchlist.map((movieObj) => {
      return genreId[movieObj.genre_ids[0]];
    });
    const temp1 = new Set(temp) 
    setGenre(["All Genres", ...temp1]);
  }, [watchlist]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {genre.map((gen) => {
          return (
            <div key={gen.id}
            onClick={()=>handleGenre(gen)}
              className={
                currGenre===gen
                  ? "bg-blue-500/70 w-[9rem] h-[3rem] flex items-center justify-center rounded-xl fond-bold text-xl text-white hover:cursor-pointer"
                  : "bg-gray-400/50 w-[9rem] h-[3rem] flex items-center justify-center rounded-xl fond-bold text-xl hover:cursor-pointer"
              }
            >
              {gen}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-5">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search Movies"
          className="outline-none bg-gray-200 px-4 w-[18rem] h-[3rem]"
        />
      </div>

      <div className="border mt-5 border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th className="flex justify-center gap-2">
                <div
                  onClick={sortingIncreased}
                  className="hover:cursor-pointer hover:bg-gray-500/30 duration-300 rounded-xl"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div>Ratings</div>
                <div
                  onClick={sortingDecreased}
                  className="hover:cursor-pointer hover:bg-gray-500/30 duration-300 rounded-xl"
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre==='All Genres'){
                return true
              }
              else{
                return genreId[movieObj.genre_ids[0]] === currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => (
                <tr className="border-b-2" key={movieObj.id}>
                  <td className="flex justify-center">
                    <img
                      className="h-[10rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt="The-Matrix-1999"
                    />
                  </td>
                  <td className="text-center px-6 py-6">{movieObj.title}</td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreId[movieObj.genre_ids[0]]}</td>
                  <td onClick={()=>handleRemoveFromWatchList(movieObj)} className="text-red-800 font-bold hover:cursor-pointer">
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
