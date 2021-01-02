import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/pokemon.css";
import { Link } from "react-router-dom";
import pokeball from "../pokeball.png";

function Pokemon() {
  useEffect(() => {
    apicalls();
  }, []);

  const [available, notavailable] = useState(false);
  const [pokemonState, pokemonStateNo] = useState([]);
  const [search, searchSpace] = useState(null);

  const pokemonData = [];
  const apicalls = async () => {
    for (let i = 1; i <= 20; i++) {
      const q = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonData.push((await q).data);
    }
    pokemonStateNo(pokemonData);
    notavailable(true);
  };
  function searchTarget(event) {
    let keyword = event.target.value;
    searchSpace(keyword);
  }
  const itemsT = pokemonState
    .filter((d) => {
      if (search === null) {
        return d;
      } else if (d.name.toLowerCase().includes(search.toLowerCase())) {
        return d;
      }
    })
    .map((d) => {
      return (
        <div className="card">
          <img
            className="card-img-top"
            src={d.sprites.front_default}
            alt="Card cap"
          ></img>
          <div className="card-body" key={d.id}>
            <h5 className="card-title" key={d.name}>
              {d.name}
            </h5>
            <p className="card-text">
              {d.types.map((t) => t.type.name).join(", ")}
            </p>
            <button className="button-animation">
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to={`/${d.id}`}
              >
                <p>More Info</p>
              </Link>{" "}
            </button>
          </div>
        </div>
      );
    });

  if (available) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <h1 className="title">PokeDex</h1>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <img
                id="searchEngine"
                className="pokeball"
                src={pokeball}
                alt=""
                srcset=""
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Search for pokemon"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => searchTarget(e)}
          />
        </div>
        <div className="row">
          {/*           {pokemonState.map((p) => (
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
          ))} */}
          {itemsT}
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
}

export default Pokemon;
