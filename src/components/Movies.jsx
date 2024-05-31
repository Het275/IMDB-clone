import React, { useEffect, useState } from 'react'
import MovieCards from './MovieCards'
import axios from 'axios'
import Pagination from './Pagination';

function Movies() {

    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    const handlePrevious = () => {
        if(pageNo === 1){
            setPageNo(pageNo);
        }else{
            setPageNo(pageNo - 1);
        }
    }

    const handleNext = () => {
        setPageNo(pageNo + 1);
    }

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d8f9854665f5b88ed3266425497d7fa2&language=en-US&page=${pageNo}`) .then(function(res){
            setMovies(res.data.results);
        })
    }, [pageNo]);

  return (
    <div className='p-5'>
        <div className='text-center font-bold text-2xl'>
            Trending Movies
        </div>
        <div className='flex flex-row justify-between flex-wrap gap-8 mt-5'>
            {movies.map((movieObj)=>{
               return <MovieCards movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} />
            })}
        </div>

        <div>
            <Pagination pageNo={pageNo} handlePrevious={handlePrevious} handleNext={handleNext}/>
        </div>
    </div>
  )
}

export default Movies