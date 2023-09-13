import React from "react";
import starwars from "../../img/starwars.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = ({
  favorites,
  removeFavorite,
  selectedCharacter,
  selectedPlanet,
}) => {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container">
        <a href="/">
          <img
            src={starwars}
            alt="Star Wars Logo"
            className="navbar-brand mb-0"
            width="100px"
          />
        </a>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-favorites"
            className="mr-3"
          >
            Favorites <span className="badge badge-light">{favorites.length}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {favorites.map((favorite, index) => (
              <Dropdown.Item key={index}>
                {favorite.type === "character" ? (
                  <>
                    {favorite.data.properties.name}
                    <button
                      className="btn btn-outline-danger ml-2"
                      onClick={() =>
                        removeFavorite(favorite.data.properties.url, true)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                ) : (
                  <>
                    {favorite.data.properties.name}
                    <button
                      className="btn btn-outline-danger ml-2"
                      onClick={() =>
                        removeFavorite(favorite.data.properties.url, false)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};
