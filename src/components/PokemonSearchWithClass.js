import React, { Component } from 'react';
import axios from 'axios';

class PokemonSearchClass extends Component {
    state = {
        pokemonData: null,
        keyword: '',
        click: 0
    }


    componentDidUpdate() {
        if (this.state.keyword !== '') {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${this.state.keyword}`)
                .then(({ data }) => {
                    console.log(data)
                    this.setState({ pokemonData: data });
                })
                .catch((err) => console.log(err));
        }

    }

    PokemonShow = () => {
        const { pokemonData, click } = this.state;
        if (pokemonData) {
            return (
                <div>
                    <h3 className="app">name pokemon : {pokemonData.name}</h3>
                    <button className="btn-detail" onClick={this.showHide}>show detail</button>
                    <hr />
                    {click % 2 === 1 ? <this.DetailShow /> : null}
                </div>
            )
        } else {
            return (
                <div className="app">no data result, please search</div>
            )
        }
    }

    DetailShow = () => {
        const { pokemonData } = this.state;
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

    inputHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setState({ keyword: e.target.value });
        }
    }

    showHide = () => {
        this.setState((prevclick) => {
            return {
                click: prevclick.click + 1
            };
        });
    };

    render() {
        return (
            <div>
                <form className="search-form">
                    <input className="search-bar"
                        onKeyDown={this.inputHandler} type="text" placeholder="search pokemon.." />
                </form>
                <this.PokemonShow />
            </div>
        );
    };
}

export default PokemonSearchClass;