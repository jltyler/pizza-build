import React from 'react';
import './Preview.css'

const positions = [];

for (let i = 0; i < 20; i++) {
    positions.push([
        Math.random() * 180 + 40,
        Math.random() * 10 + 0,
    ]);
}

console.log("positions: ", positions);

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
                            left: p[0],
                            top: p[1],
                        }}
                        key={i}></div>
                })}

            </div>
            {ListIngredients(props.ingredients)}
        </div>
    )
}

export default Preview;