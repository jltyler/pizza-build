import React from 'react';
import './Preview.css'
import Helpers from '../../../Helpers';
import Poisson from '../../../Poisson';

const positions = Poisson(400, 400, 40, {cullDistance: 180});

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
                {positions.map((p, i) => {
                    return <div
                        className="pepperoni"
                        style={{
                            left: p[0] - 10,
                            top: p[1] - 10,
                        }}
                        key={i}></div>
                })}

            </div>
            {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;