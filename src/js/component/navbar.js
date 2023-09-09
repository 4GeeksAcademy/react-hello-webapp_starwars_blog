import React from "react";
import starwars from "../../img/starwars.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Navbar = ({ favoritesCount, favorites, removeFavorite, selectedCharacter }) => {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/">
        <img src={starwars} alt="Star Wars Logo" className="navbar-brand mb-0" width="100px" />
      </Link>
      <div className="ml-auto">
        {selectedCharacter && (
          <div className="d-flex align-items-center">
            <span>{selectedCharacter.name}</span>
            <button className="btn btn-outline-danger ml-2" onClick={() => removeFavorite(selectedCharacter.url)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
        <Link to="/demo">
          <button className="btn btn-primary" disabled>
            Favorites <span className="badge badge-light">{favoritesCount}</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};
