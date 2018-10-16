import React from 'react';
import './Preview.css'
import Helpers from '../../../Helpers';
import Poisson from '../../../Poisson';

const pizzaSize = 400 - 16 * 2;

const positions = Poisson(pizzaSize, pizzaSize, 30, {cullDistance: 180});

const ingredientMapper = (name, p, i) => {
    return <div
        className={name}
        style={{left: p[0] - 10, top: p[1] - 10}}
        key={i} />
}

const pepperoni_elements = [
    null,
    Poisson(pizzaSize, pizzaSize, 35, {cullDistance: 180}).map(ingredientMapper.bind(null, 'pepperoni')),
    Poisson(pizzaSize, pizzaSize, 25, {cullDistance: 180}).map(ingredientMapper.bind(null, 'pepperoni')),
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

            </div>
            {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;