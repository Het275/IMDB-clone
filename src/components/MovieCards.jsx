import React, { useContext, useEffect } from "react";
import { ContextPath } from "./ContextPath";

function MovieCards({ poster_path, name, movieObj }) {
  const { watchlist, setWatchList } = useContext(ContextPath);

  const handleAddToWatchList = (movieObj) => {
    const newWatchList = [...watchlist, movieObj];
    localStorage.setItem("data", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

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

  function doesContent() {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      key={movieObj.id}
      className="h-[40vh] w-[170px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContent() ? (
        <div
          className="bg-gray-900/80 rounded-xl flex justify-center p-1.5 m-2"
          onClick={() => {
            handleRemoveFromWatchList(movieObj);
          }}
        >
          ❌
        </div>
      ) : (
        <div
          onClick={() => {
            handleAddToWatchList(movieObj);
          }}
          className="bg-gray-900/80 rounded-xl flex justify-center p-1.5 m-2"
        >
          &#128525;
        </div>
      )}

      <div className="text-white bg-gray-900/60 w-full text-center rounded-xl p-2">
        {name}
      </div>
    </div>
  );
}

export default MovieCards;
