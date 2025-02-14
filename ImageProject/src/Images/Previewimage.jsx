import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PrewiewImage.css";

const PreviewImage = () => {
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=48545552-fc9a15f1c0e7ed54aeba440c7&id=${id}`)
      .then((res) => {
        if (res.data.hits.length > 0) {
          setImage(res.data.hits[0]);
        }
      })
      .catch((err) => console.error("Error Fetching image", err));
  }, [id]);

  if (!image) {
    return <p className="loading-text">Loading Image...</p>;
  }

  return (
    <React.Fragment>
    <main className="Body">
    <div className="preview-container">
      <h1 className="Type">{image.type.toUpperCase()}</h1>
      <img src={image.largeImageURL} alt="Preview" className="preview-image" />
      <p className="image-tags">
        {image.tags ? image.tags.split(",").slice(0, 4).join(", ") : "No Tags Available"}
      </p>
    </div>
    </main>
    </React.Fragment>
  );
};

export default PreviewImage;
