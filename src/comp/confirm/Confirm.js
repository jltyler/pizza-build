import React from 'react';

const Confirm = (props) => {
    const ingredients = []
    for (const i in props.order.ingredients) {
        if (props.order.ingredients[i] > 0) ingredients.push(<div className="ingredient" key={i}>{i}: {props.order.ingredients[i]} </div>)
    }
    return (
    <div className="confirm">
        Size: {props.order.size} <br/>
        {ingredients.length > 0 && ingredients}
        <br />
        Total: {props.order.total.toFixed(2)} <br />
        <button onClick={props.confirmOrder}>Confirm Order</button>
    </div>
    );
}

export default Confirm;