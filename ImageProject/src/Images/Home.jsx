import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
const Home = () => {
  const[Data,setdata]=useState([]);
  const[Search,setseach]=useState("");
  const Inputref=useRef();
  function search(){
    setseach(Inputref.current.value);
  }
  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&q=${Search}+flowers&image_type=photo`)
    .then((res)=>res.json())
    .then((d)=>setdata(d.hits))
  },[search]);
  function ClickEnter(event){
  if(event.key=='Enter')
    {
      search();
    }
  }
    return (
    <React.Fragment>
      <div className='search'>
        <input ref={Inputref} type="text" placeholder='Search Image' onKeyDown={ClickEnter}/> 
        <button onClick={search}>Search</button>      
      </div>
      <div className='images'>
          {Data.map((item)=>{
            return(
              <React.Fragment key={item.id}>
                <img src={item.previewURL} alt="Images" width={item.previewWidth} height={item.previewHeight}/>
              </React.Fragment>
            )
          })}
        </div>
    </React.Fragment>
  )
}

export default Home