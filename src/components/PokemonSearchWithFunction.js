import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function PokemonSearchFunction() {
    const [pokemonData, setPokemonData] = useState();
    const [keyword, setKeyword] = useState();
    const skipFirst = useRef(true);
    const [click, setClick] = useState(0);

    useEffect(() => {
        // skip render pertama
        if (skipFirst.current) {
            skipFirst.current = false;
            return;
        }

        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${keyword}`)
            .then(({ data }) => {
                console.log(data)
                setPokemonData(data)
            })
            .catch((err) => console.log(err));
    }, [keyword]);

    const PokemonShow = () => {
        if (pokemonData) {
            return (
                <div>
                    <h3 className="app">name pokemon : {pokemonData.name}</h3>
                    <button className="btn-detail" onClick={showHide}>show detail</button>
                    <hr />
                    {click % 2 === 1 ? <DetailShow /> : null}
                </div>
            )
        } else {
            return (
                <div className="app">no data result, please search</div>
            )
        }
    }

    const DetailShow = () => {
        return (
            <div className="app">
                <ul>
                    <li>id : {pokemonData.id}</li>
                    <li>type: {pokemonData.types[0].type.name}</li>
                    <li>height: {pokemonData.height}</li>
                    <li>weight: {pokemonData.weight}</li>
                </ul>
            </div>
        )
    }

    const inputHandler = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setKeyword(e.target.value);
        }
    }

    const showHide = () => {
        setClick((prevclick) => prevclick + 1);
    }


    return (
        <div>
            <form className="search-form">
                <input className="search-bar"
                    onKeyDown={inputHandler} type="text" placeholder="search pokemon.."/>
            </form>
            <PokemonShow />
        </div>


    );
};

export default PokemonSearchFunction;