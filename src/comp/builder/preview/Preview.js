import React from 'react';
import './Preview.css'
import Helpers from '../../../Helpers';
import Poisson from '../../../Poisson';

const pizzaSize = 400 - 16 * 2;

const ingredientMapper = (name, p, i) => {
    return (<div
        className={name}
        style={{left: p[0] - 10, top: p[1] - 10, transform: 'rotate(' + (Math.random() * 360).toFixed(0) + 'deg)'}}
        key={name + i} />)
}

const pepperoniElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
    Poisson(pizzaSize, pizzaSize, 23, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
]

const mushroomMapper = (p, i) => {
    return (<div
        className="mushroom"
        style={{left: p[0] - 10, top: p[1] - 10, transform: 'rotate(' + (Math.random() * 360).toFixed(0) + 'deg)'}}
        key={"mushroom" + i}>
            <div className="mushroom-stem" />
            <div className="mushroom-head"></div>
        </div>)
}

const mushroomElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 173}).map(mushroomMapper),
    Poisson(pizzaSize, pizzaSize, 25, {cullDistance: 173}).map(mushroomMapper),
]

const oliveElements = [
    null,
    Poisson(pizzaSize, pizzaSize, 25, {cullDistance: 173}).map(ingredientMapper.bind(null, 'olive')),
    Poisson(pizzaSize, pizzaSize, 14, {cullDistance: 173}).map(ingredientMapper.bind(null, 'olive')),
]

const ListIngredients = (ingredients) => {
    const ret_list = [];
    for (const i in ingredients)
    {
        ret_list.push(<div key={i}>name: {i}<br />count: {ingredients[i]}</div>);
    }
    return ret_list
}

const Preview = (props) => {
    return (
        <div className="preview">
            <div className="pizza-base">
                {pepperoniElements[props.ingredients.pepperoni]}
                {oliveElements[props.ingredients['black olives']]}
                {mushroomElements[props.ingredients.mushrooms]}
                
            </div>
            {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;