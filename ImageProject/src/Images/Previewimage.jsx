import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';

const PreviewImage = () => {
  const [image, setImage] = useState({});
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for related images

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
    if (!image.tags) return;  // Ensure tags exist before proceeding
    const tags = image.tags.split(',').slice(0, 1).join(', ');  // Using only the first tag for search
    setLoading(true);  // Set loading state before fetching related images

    axios
      .get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&q=${tags}&image_type=photo&order=latest&per_page=10&`)
      .then((res) => {
        setData(res.data.hits);
        setLoading(false);  // Set loading state to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching related images:', error);
        setLoading(false);  // Set loading state to false even if there is an error
      });
  }, [image]);  // Run this effect when 'image' is updated

  function handlescrolltop() {
    window.scrollTo(0, 0);  // Scroll to top when clicking on a related image
  }

  return (
    <main className="body">
      <div className="Back">
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
      <div className="preview">
        {image.largeImageURL ? (
          <img src={image.largeImageURL} alt={image.id} />
        ) : (
          <h2>Loading Image...</h2>  // Show loading message if image is not yet available
        )}
        <p>{image.tags ? image.tags.split(',').slice(0, 4).join(', ') : 'No tags available'}</p>
      </div>
      <div className="images">
        {loading ? (
          <h2>Loading Related Images...</h2>  // Show loading message while related images are being fetched
        ) : (
          data.map((item, index) => (
            <div key={index} className="cards">
              <Link to={`/Preview/${item.id}`} onClick={handlescrolltop}>
                {item.webformatURL ? (
                  <img
                    src={item.webformatURL}
                    alt={item.tags}
                    width={item.previewWidth}
                    height={item.previewHeight}
                  />
                ) : (
                  <h1>Loading</h1>
                )}
              </Link>
              <p>{item.tags.split(',').slice(0, 3).join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default PreviewImage;
