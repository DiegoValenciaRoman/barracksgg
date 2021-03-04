import axios from "axios";
import React, { useEffect, useState } from "react";

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");

  /**
   * @params None, uses local component state
   * @description Updates pokemons array info from the data fetched from the pokemon API
   * @returns void
   */
  const getPokemons = () => {
    //por defecto se limita a 20 pokemons
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        if (response.status === 200) {
          setPokemons(
            response.data.results.sort((a, b) => a.name.localeCompare(b.name))
          );
          console.log(
            response.data.results.sort((a, b) => a.name.localeCompare(b.name))
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  /**
   * @params pokemonUrl: string
   * @description fetches specific pokemon data from pokemon API based on the url from the parameter and updates the pokemon selected image info
   * on the local state
   * @returns void
   */

  const getPokemon = (pokemonUrl) => {
    axios
      .get(pokemonUrl)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setSelectedPokemon(response.data.sprites.front_default);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleSelectChange = (e) => {
    if (e.target.value === "") {
      setSelectedPokemon("");
    } else {
      getPokemon(e.target.value);
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <select name="Pokemon" id="pokemonSelect" onChange={handleSelectChange}>
          <option value="">Selecciona</option>
          {pokemons.map((pokemon) => (
            <option value={pokemon.url}>{pokemon.name}</option>
          ))}
        </select>
      </div>
      <div className="imageShowcase">
        {selectedPokemon === "" ? (
          "Selecciona un pokemon"
        ) : (
          <div>
            <img
              src={selectedPokemon}
              style={{ width: "320px", height: "320px" }}
              alt={selectedPokemon}
            ></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokemon;
