import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/pokemon.css";

function More({ match }) {


  const [data, noData] = useState([]);    
  const [sp, nospecies] = useState([]); /* for species */
  const [available, notavailable] = useState(false);    /* loading */


  useEffect(() => {
    information();
    evolution();
  }, []);
  const information = async () => {
    const q = axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`);
    noData((await q).data);
    notavailable(true);
  };
  const evolution = async () => {
    const q = axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`);
    const spi = (await q).data.species.url;
    const s = axios.get(spi);
    const y = (await s).data.evolution_chain.url;
    const ev = axios.get(y);
    const j = (await ev).data.chain;
    nospecies(j.evolves_to);
  };

  if (available) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="d-flex justify-content-center">
              <h1 className="title">{data.name}</h1>
            </div>
            <div className="d-flex justify-content-center">
              <img
                className="pokemon-image"
                src={data.sprites.front_default}
                alt={data.name}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="sub-headings">
                Height: {data.height} , Weight: {data.weight}, Base Experience:{" "}
                {data.base_experience}
              </p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p className="sub-headings">Moves</p>
              <p className="list-items">
                {data.moves.map((l) => l.move.name).join(", ")}
              </p>
              <p className="sub-headings">Games found</p>
              <p className="list-items">
                {data.game_indices.map((l) => l.version.name).join(", ")}
              </p>
            </div>
            {sp.map((i) => (
              <div className="col-lg-12 col-md-12 col-sm-12">
                <p className="sub-headings">Evolution</p>
                {i.evolves_to.map((k) => (
                  <p className="list-items">
                    Final Evolution:{" "}
                    {k.species.name === data.name ? (
                      <p className="oops">You are at final evolution</p>
                    ) : (
                      k.species.name
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
}

export default More;
