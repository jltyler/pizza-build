import React from 'react';
import './Preview.css'

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
        {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;