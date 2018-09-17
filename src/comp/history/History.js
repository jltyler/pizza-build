import React from 'react';
import './History.css'
import Store from './../builder/Store'

const Ingredient = (props) => {
    return (
        <div className="ingredient">{props.name}, Count: {props.count}</div>
    )
}

const Entry = (props) => {
    const ingredients = []
    for (const ing in props.orderObject.ingredients) {
        ingredients.push({name: ing, count: props.orderObject.ingredients[ing]})
    }
    return (
        <div className="entry">
            <div className="left">
                Size: {props.orderObject.size} <br />
                Total: {props.orderObject.total.toFixed(2)}
            </div>
            <div className="right">
                {ingredients.length > 0 && ingredients.map((ing, index) => (
                    <Ingredient key={index} name={ing.name} count={ing.count} />
                ))}
            </div>
        </div>
    )
}

const History = (props) => {
    return (
        <div className="history">
            {Store.history.map((e, i) => (
                <Entry key={i} index={i} orderObject={e} />
            ))}
        </div>
    )
}

export default History;