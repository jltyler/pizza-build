import React from 'react';
import './Preview.css';
import Poisson from '../../../Poisson';

const pizzaSize = 400 - 16 * 2;

const ingredientMapper = (name, p, i) => {
    return (<div
        className={name}
        style={{left: p[0] - 10, top: p[1] - 10, transform: 'rotate(' + (Math.random() * 360).toFixed(0) + 'deg)'}}
        key={name + i} />);
};

const pepperoniElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
    Poisson(pizzaSize, pizzaSize, 23, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
];

const mushroomMapper = (p, i) => {
    return (<div
        className="mushroom"
        style={{left: p[0] - 10, top: p[1] - 10, transform: 'rotate(' + (Math.random() * 360).toFixed(0) + 'deg)'}}
        key={"mushroom" + i}>
            <div className="mushroom-stem" />
            <div className="mushroom-head" />
        </div>);
};

const mushroomElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 170}).map(mushroomMapper),
    Poisson(pizzaSize, pizzaSize, 25, {cullDistance: 170}).map(mushroomMapper),
];

const oliveElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 25, {cullDistance: 173}).map(ingredientMapper.bind(null, 'olive')),
    Poisson(pizzaSize, pizzaSize, 14, {cullDistance: 173}).map(ingredientMapper.bind(null, 'olive')),
];

const pineappleElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 30, {cullDistance: 170}).map(ingredientMapper.bind(null, 'pineapple')),
    Poisson(pizzaSize, pizzaSize, 20, {cullDistance: 170}).map(ingredientMapper.bind(null, 'pineapple')),
];

const greenchileElements = [
    null,
    Poisson(pizzaSize + 4, pizzaSize + 4, 20, {cullDistance: 175}).map(ingredientMapper.bind(null, 'greenchile')),
    Poisson(pizzaSize + 4, pizzaSize + 4, 10, {cullDistance: 175}).map(ingredientMapper.bind(null, 'greenchile')),
];

const anchovyElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 55, {cullDistance: 175}).map(ingredientMapper.bind(null, 'anchovy')),
    Poisson(pizzaSize, pizzaSize, 40, {cullDistance: 175}).map(ingredientMapper.bind(null, 'anchovy')),
];

const Preview = (props) => {
    return (
        <div className="preview">
            <div className="pizza-base">
                {pepperoniElements[props.ingredients.pepperoni]}
                {oliveElements[props.ingredients['black olives']]}
                {mushroomElements[props.ingredients.mushrooms]}
                {pineappleElements[props.ingredients.pineapple]}
                {greenchileElements[props.ingredients['green chile']]}
                {anchovyElements[props.ingredients['anchovies']]}
            </div>
            {props.children}
        </div>
    );
};

export default Preview;