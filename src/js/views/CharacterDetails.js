import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const apiUrl = `https://www.swapi.tech/api/people/${id}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.message === "not found") {
                    throw new Error('El personaje no se encuentra.');
                } else if (data && data.result && data.result.properties) {
                    setCharacter(data.result.properties);
                } else {
                    throw new Error('Error al obtener detalles del personaje.');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Error al obtener detalles del personaje.');
            });

    }, [id]);

    if (error) return <p>{error}</p>;
    if (!character) return <p>Loading...</p>;

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <img src="https://via.placeholder.com/150" alt={character.name} className="mr-3" />
                    <div>
                        <h2 className="card-title">{character.name}</h2>
                        <p className="card-text">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia, nisl non lacinia fringilla, mauris metus congue est, at scelerisque quam sem et lorem."}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <h4 className="text-danger">Detalles:</h4>
                    <p>Gender: {character.gender}</p>
                    <p>Birth Year: {character.birth_year}</p>
                    {/* Agrega más detalles aquí según la estructura de 'character' */}
                </div>
            </div>
        </div>
    );
};
