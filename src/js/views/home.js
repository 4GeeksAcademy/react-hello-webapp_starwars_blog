import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../js/component/navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Dentro del componente Home
  const toggleFavorite = (url, isCharacter) => {
    if (isCharacter) {
      const character = people.find(person => person.properties.url === url);
      setSelectedCharacter(character || null);

      if (favorites.includes(url)) {
        setFavorites(favorites.filter(fav => fav !== url));
      } else {
        setFavorites([...favorites, url]);
      }
    } else {
      const planet = planets.find(planet => planet.properties.url === url);
      setSelectedPlanet(planet || null);

      if (favoritePlanets.includes(url)) {
        setFavoritePlanets(favoritePlanets.filter(fav => fav !== url));
      } else {
        setFavoritePlanets([...favoritePlanets, url]);
      }
    }
  };

  const removeFavorite = (url, isCharacter) => {
    if (isCharacter) {
      setSelectedCharacter(null);
      setFavorites(favorites.filter(fav => fav !== url));
    } else {
      setSelectedPlanet(null);
      setFavoritePlanets(favoritePlanets.filter(fav => fav !== url));
    }
  };

  useEffect(() => {
    const fetchPeople = fetch("https://www.swapi.tech/api/people/")
      .then(res => res.json())
      .then(data => {
        const peoplePromises = data.results.map(person =>
          fetch(person.url).then(res => res.json())
        );
        return Promise.all(peoplePromises);
      })
      .then(peopleDetailed => {
        setPeople(peopleDetailed.map(p => p.result));
      });

    const fetchPlanets = fetch("https://www.swapi.tech/api/planets/")
      .then(res => res.json())
      .then(data => {
        const planetPromises = data.results.map(planet =>
          fetch(planet.url).then(res => res.json())
        );
        return Promise.all(planetPromises);
      })
      .then(planetsDetailed => {
        setPlanets(planetsDetailed.map(p => p.result));
      });

    Promise.all([fetchPeople, fetchPlanets])
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      });

  }, []);

  const totalFavorites = favorites.length + favoritePlanets.length;

  return (
    <div className="text-center mt-5">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Navbar
        favoritesCount={totalFavorites}
        favorites={favorites}
        favoritePlanets={favoritePlanets}
        removeFavorite={removeFavorite}
        selectedCharacter={selectedCharacter}
        selectedPlanet={selectedPlanet}
      />

      <h2>Characters</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto">
        {people.map(person => {
          const isCharacterFavorite = favorites.includes(person.properties.url);
          return (
            <div key={person.properties.url} className="card m-2" style={{ width: '18rem', flex: '0 0 auto' }}>
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={person.properties.name} />
              <div className="card-body">
                <h5 className="card-title">{person.properties.name || "N/A"}</h5>
                <p className="card-text">Gender: {person.properties.gender || "N/A"}</p>
                <p className="card-text">Birth Year: {person.properties.birth_year || "N/A"}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/people/${person.uid}`} className="btn btn-success ml-2">Learn more!</Link>
                  <button
                    className={`btn btn-outline-primary ${isCharacterFavorite ? "text-danger" : ""}`}
                    onClick={() => toggleFavorite(person.properties.url, true)}
                  >
                    {isCharacterFavorite ? (
                      <>
                        <FontAwesomeIcon icon={faTrash} />
                        {" Remove"}
                      </>
                    ) : (
                      <FontAwesomeIcon icon={faHeart} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Planets</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto">
        {planets.map(planet => {
          const isPlanetFavorite = favoritePlanets.includes(planet.properties.url);
          return (
            <div key={planet.properties.url} className="card m-2" style={{ width: '18rem', flex: '0 0 auto' }}>
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={planet.properties.name} />
              <div className="card-body">
                <h5 className="card-title">{planet.properties.name || "N/A"}</h5>
                <p className="card-text">Population: {planet.properties.population || "N/A"}</p>
                <p className="card-text">Terrain: {planet.properties.terrain || "N/A"}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/planet/${planet.uid}`} className="btn btn-success mt-3">Learn more!</Link>
                  <button
                    className={`btn btn-outline-primary ${isPlanetFavorite ? "text-danger" : ""}`}
                    onClick={() => toggleFavorite(planet.properties.url, false)}
                  >
                    {isPlanetFavorite ? (
                      <>
                        <FontAwesomeIcon icon={faTrash} />
                        {" Remove"}
                      </>
                    ) : (
                      <FontAwesomeIcon icon={faHeart} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
