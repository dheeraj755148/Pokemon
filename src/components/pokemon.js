import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/pokemon.css";
import { Link } from "react-router-dom";
import pokeball from "../pokeball.png";
import InfiniteScroll from "react-infinite-scroller";

function Pokemon() {
  const [available, notavailable] = useState(false);
  const [pokemonState, pokemonStateNo] = useState([]);
  const [search, searchSpace] = useState(null);
  const [hasMoreItems, noMoreItems] = useState(true);
  const [countm, countDef] = useState();
  const [iterate, iterationUpdate] = useState(50);
  useEffect(() => {
    apicalls();
    countNess();
  }, [iterate]);

  const countNess = async () => {
    const d = axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    const temp = (await d).data;
    console.log(temp)
    countDef(temp.count);
  };

  const apicalls = async () => {
    var pokemonData = [];

    for (var i = 1; i <= iterate; i++) {
      const q = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonData.push((await q).data);
    }

    pokemonStateNo(pokemonData);
    notavailable(true);
  };

  const loadMore = () => {
    if (iterate === countm) {
      noMoreItems(false);
    } else {
      setTimeout(() => {
        iterationUpdate(iterate + 100);
      }, 5000);
    }
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
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <img
                id="searchEngine"
                className="pokeball"
                src={pokeball}
                alt="Pokeball"
              />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
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
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMoreItems}
            useWindow={false}
            className="row"
            loader={<div className="loader"></div>}

          >
            {itemsT}
          </InfiniteScroll>{" "}
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
}

export default Pokemon;
