import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export const PlanetDetails = () => {
    const [planet, setPlanet] = useState(null);
    const { id: planetId } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${planetId}`)
            .then(response => response.json())
            .then(data => setPlanet(data.result.properties))
            .catch(error => console.error(error));
    }, [planetId]);

    if (!planet) return <p>Loading...</p>;

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <img src="https://via.placeholder.com/150" alt={planet.name} className="mr-3" />
                    <div>
                        <h2 className="card-title">{planet.name}</h2>
                        <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...
                        </p>
                    </div>
                </div>
                <div className="mt-3">
                    <h4 className="text-danger">Detalles:</h4>
                    <p>Population: {planet.population}</p>
                    <p>Terrain: {planet.terrain}</p>
                    {/* Agrega más detalles aquí según la estructura de 'planet' */}
                </div>
            </div>
        </div>
    );
};

