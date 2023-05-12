import React from "react";
import "./Home.css";
import { useGlobalContext } from "../../context/Global";
import { Link } from "react-router-dom";

function RomanceManga({ rendered }) {
  const { romanceManga, isSearch, searchResults } = useGlobalContext();
  console.log({ rendered });

  const conditionalRender = () => {
    if (!isSearch && rendered === "romance") {
      return romanceManga?.map((manga) => {
        return (
          <Link to={`manga/${manga.mal_id}`} key={manga.mal_id}>
            <img src={manga.images.jpg.large_image_url} />
            <p>{manga.title}</p>
          </Link>
        );
      });
    } else {
      return (
        <div className="popular-manga-search">
          {searchResults?.map((manga) => {
            return (
              <Link to={`manga/${manga.mal_id}`} key={manga.mal_id}>
                <img src={manga.images.jpg.large_image_url} />
                <p>{manga.title}</p>
              </Link>
            );
          })}
        </div>
      );
    }
  };
  return <div className="popular-manga">{conditionalRender()}</div>;
}

export default RomanceManga;
