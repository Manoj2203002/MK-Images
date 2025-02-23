import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css'

const PreviewImage = () => {
  const [image, setImage] = useState({});
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&id=${id}&image_type=photo`)
      .then((res) => {
        if (res.data.hits.length > 0) {
          setImage(res.data.hits[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&image_type=photo&order=latest&per_page=10&`)
      .then((res) => {
        setData(res.data.hits);
      });
  }, []);
  function handlescrolltop(){
    window.scrollTo(0,0);
  }
  return (
    <main className="body">
      <div className='Back'>
     <Link to={"/"}><button> Back </button></Link>
     </div>
      <div className="preview">
          <img src={image.largeImageURL} alt={image.id} />
       <p>{image.tags ? image.tags.split(',').slice(0, 4).join(', ') : 'No tags available'}</p>
      </div>
      <div className='images'>
            {data.map((item, index) => (
              <div key={index} className='cards'>
               <Link to={`/Preview/${item.id}`} onClick={handlescrolltop}>
               {image.largeImageURL ? <img src={item.webformatURL} alt={item.tags} width={item.previewWidth} height={item.previewHeight} />
               : (<h1>Loading</h1>)} 
               </Link>
                <p>{item.tags.split(',').slice(0, 2).join(', ')}</p>
              </div>
            ))}
            </div>
    </main>
  );
}

export default PreviewImage;
