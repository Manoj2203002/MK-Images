import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Home = () => {
  const[Data,setdata]=useState([]);
  const[Search,setseach]=useState("");
  const Inputref=useRef();
  function search(){
    setseach(Inputref.current.value);
  }
  useEffect(()=>{
    axios.get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&q=${Search}+flowers&image_type=photo`)
    .then((d)=>setdata(d.data.hits))
  },[Search]);
  function ClickEnter(event){
  if(event.key==='Enter')
    {
      search();
    }
  }
    return (
    <React.Fragment>
      <main>
      <div className='search'>
        <input ref={Inputref} type="text" placeholder='Search Image' onKeyDown={ClickEnter}/> 
        <button onClick={search}>Search</button>      
      </div>
      <div className='images'>
          {Data.map((item)=>{
            return(
               <React.Fragment key={item.id}>
                <Link to={`/Preview/${item.id}`}>
                <div>
                  <img src={item.previewURL} alt="Images" width={item.previewWidth} height={item.previewHeight}/>
                  <p>{item.type}</p>
                  <p className="tags">{item.tags.split(',').slice(0, 4).join(', ')}</p>
                  </div> </Link>
              </React.Fragment>
            )
          })}
        </div>
        </main>
    </React.Fragment>
  )
}

export default Home