import React from 'react';
import './Confirm.css';
import Data from '../../Data';
import Helpers from "../../Helpers";

const Confirm = (props) => {
    const ingredients = [];
    const multiplier = Data.sizeTable[props.order.size].multiplier;
    const piePrice = Data.basePrice * multiplier;
    for (const i in props.order.ingredients) {
        if (props.order.ingredients[i] > 0)
            ingredients.push((
                <div
                    className="ingredient"
                    key={i}>
                    {Helpers.capitalize(i)} {props.order.ingredients[i] > 1 ? '(2x)' : ''} (${(Data.ingredientPrices[i] * props.order.ingredients[i] * multiplier).toFixed(2)})
                </div>));
    }
    return (
    <div className="confirm">
        <h1>{Helpers.capitalize(props.order.size)} pizza (${piePrice.toFixed(2)})</h1><br/>
        {ingredients.length > 0 && ingredients}
        <br />
        <h1>Total: {props.order.total.toFixed(2)}</h1><br />
        <button className="confirm-button" onClick={props.confirmOrder}>Confirm Order</button>
        <button className="cancel-button" onClick={props.goBack}>Go Back</button>
    </div>
    );
};

export default Confirm;