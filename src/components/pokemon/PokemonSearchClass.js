import React, { Component } from 'react';
import axios from 'axios';

const PokemonShow = ({ pokemonData, visible, showHide }) => {
    const toggleDetail = () => {
        if (typeof showHide === 'function') {
            showHide();
        }
    };

    if (pokemonData) {
        return (
            <div>
                <h3 className="app">name pokemon : {pokemonData.name}</h3>
                <button className="btn-detail" onClick={toggleDetail}>show detail</button>
                <hr />
                {visible && <DetailShow pokemonData={pokemonData} />}
            </div>
        )
    } else {
        return (
            <div>no data result</div>
        )
    }
}

const DetailShow = ({ pokemonData }) => {
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
class PokemonSearchClass extends Component {

    state = {
        keyword: '',
        visible: false,
        pokemonData: []
    }

    showHide = () => {
        return this.setState({visible: !this.state.visible});
    }
    inputHandler = (e) => {
        return this.setState({ keyword: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${this.state.keyword}`)
            .then(({ data }) => {
                this.setState({ pokemonData: data })
            })
            .catch((err) => console.log(err));

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <input className="search-bar" type="text" placeholder="search pokemon" onChange={this.inputHandler} />
                    <button type="submit">Search</button>
                </form>
                <PokemonShow pokemonData={this.state.pokemonData} visible={this.state.visible} showHide={this.showHide} />
            </div>
        )
    }
}

export default PokemonSearchClass;