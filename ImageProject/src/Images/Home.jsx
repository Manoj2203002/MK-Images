import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';
const Home = () => {
  const [Page, setPage] = useState(1);// Set the Page Number
  const [data, setData] = useState([]); // Store the Data
  const [search, setSearch] = useState(''); // For add the search 
  const [totalHits, setTotalHits] = useState(0); // Track total number of hits
  const inputRef = useRef();

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&q=${search}&image_type=photo&editors_choice=true&page=${Page}&per_page=15`)
      .then((res) => {
        setData(res.data.hits);//update the Data
        setTotalHits(res.data.totalHits); // Update the total hits
      });
  }, [search, Page]);

  function handleSearch() {
    setSearch(inputRef.current.value); // Getting the Current Value of the input
    setPage(1); // Reset to page 1 when a new search is made
  }

  function handleKey(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  } // Seach when the enter Key is pressed

  // Calculate if there are more pages
  const hasMorePages = totalHits > Page * 15;

  function onClear(){
    setSearch("");
    setPage(1);
  }
  function handlescrolltop(){
    window.scrollTo(0,0);
  }
  return (
    <React.Fragment>
    <main className='body'>
    <div>
      <div className='search'>
        <div onClick={onClear} className='para'>
          <p>MK Images</p>
        </div>
        <div className='bar'>
       <input type="text" placeholder="Search the image" ref={inputRef} onKeyDown={handleKey}/>
       <button onClick={handleSearch}>Search</button>
       </div>
      </div>
      <div className='error'>
      {data.length===0 && (
        <div>
           <p>No images found for "{search}". Try a different search!</p>
        </div>
      )}
      </div>
      <div className='images'>
      {data.map((item, index) => (
        <div key={index} className='cards'>
         <Link to={`/Preview/${item.id}`}> 
         <img src={item.webformatURL} alt={item.tags} width={item.previewWidth} height={item.previewHeight} />
         </Link>
          <p>{item.tags.split(',').slice(0, 2).join(', ')}</p>
        </div>
      ))}
      </div>
      <div className='Pagination'>
      <button  onClick={() => { setPage(Page - 1); handlescrolltop(); }}>Previous</button>
      <p>{Page}</p>
      <button  onClick={() => { setPage(Page + 1); handlescrolltop(); }} disabled={!hasMorePages}>Next</button>
      </div>
    </div>
    </main>
    </React.Fragment>
  );
};

export default Home;