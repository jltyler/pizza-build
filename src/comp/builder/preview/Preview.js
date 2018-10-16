import React from 'react';
import './Preview.css'
import Helpers from '../../../Helpers';
import Poisson from '../../../Poisson';

const pizzaSize = 400 - 16 * 2;

const ingredientMapper = (name, p, i) => {
    return <div
        className={name}
        style={{left: p[0] - 10, top: p[1] - 10, transform: 'rotate(' + (Math.random() * 360).toFixed(0) + 'deg)'}}
        key={i} />
}

const pepperoni_elements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
    Poisson(pizzaSize, pizzaSize, 23, {cullDistance: 185}).map(ingredientMapper.bind(null, 'pepperoni')),
]

const olive_elements = [
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
                {pepperoni_elements[props.ingredients.pepperoni]}
                {olive_elements[props.ingredients['black olives']]}

            </div>
            {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;