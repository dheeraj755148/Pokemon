import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/pokemon.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Pokemon() {
  useEffect(() => {
    apicalls();
  }, []);

  const [available, notavailable] = useState(false);
  const [pokemonState, pokemonStateNo] = useState([]);

  const pokemonData = [];
  const apicalls = async () => {
    for (let i = 1; i <= 20; i++) {
      const q = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonData.push((await q).data);
    }
    pokemonStateNo(pokemonData);
    console.log(pokemonData);
    notavailable(true);
  };

  if (available) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <h1 className="title">Pokedex</h1>
        </div>
        <div className="row">
          {pokemonState.map((p) => (
            <div className="card">
              <img
                className="card-img-top"
                src={p.sprites.front_default}
                alt="Card cap"
              ></img>
              <div className="card-body" key={p.id}>
                <h5 className="card-title" key={p.name}>
                  {p.name}
                </h5>
                <p className="card-text">
                  {p.types.map((t) => t.type.name).join(", ")}
                </p>
                <button className="button-animation">
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to={`/${p.id}`}
                  >
                    <p>More Info</p>
                  </Link>{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
}

export default Pokemon;
