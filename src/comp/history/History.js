import React from 'react';
import './History.css'
import Store from './../builder/Store'
import Helpers from '../../Helpers';
import Data from '../../Data';

const randomHistory = (entries = 10) => {
    for(let i = entries; i > 0; --i)
    {
        const order = {
            size: Helpers.choose(Object.keys(Data.sizeTable)),
            ingredients: {},
        }
        Data.ingredientNames.forEach((name) => order.ingredients[name] = Helpers.choose(0, 1, 2))
        order.total = Helpers.calculateTotalPrice(order);
        Store.history.push(order)
    }
}

randomHistory();

const Ingredient = (props) => {
    return (
        <div className="ingredient">{Helpers.capitalize(props.name)} {props.count > 1 ? '(double)' : ''}</div>
    )
}

const Entry = (props) => {
    const ingredients = []
    for (const ing in props.orderObject.ingredients) {
        if (props.orderObject.ingredients[ing] > 0)
            ingredients.push(<Ingredient name={ing} count={props.orderObject.ingredients[ing]} />);
    }
    return (
        <div className="entry">
                <h1>{Helpers.capitalize(props.orderObject.size)} Pizza</h1><br />
                {ingredients.length > 0 && ingredients}
                <h2>Total: {props.orderObject.total.toFixed(2)}</h2>
        </div>
    )
}

const History = (props) => {
    return (
        <div className="history">
            <div className="title">Order History <br />Total entries: {Store.history.length}</div>
            {Store.history.map((e, i) => (
                <Entry key={i} index={i} orderObject={e} />
            ))}
        </div>
    )
}

export default History;