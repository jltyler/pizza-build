import React, {Component} from 'react';
import Preview from './preview/Preview';
import Controls from './controls/Controls';
import Control from './controls/Control';
import './Builder.css';

const ingredient_list = [
    {
        name: 'pepperoni',
        price: 0.5,
    },
    {
        name: 'mushrooms',
        price: 0.725,
    },
    {
        name: 'black olives',
        price: 0.65,
    },
    {
        name: 'anchovies',
        price: 1.5,
    },
]

const size_table = {
    small: {
        diameter: '8 inches',
        multiplier: 1,
    },
    medium: {
        diameter: '10 inches',
        multiplier: 1.55,
    },
    large: {
        diameter: '12 inches',
        multiplier: 2.23,
    },
    party: {
        diameter: '18 inches',
        multiplier: 5.02,
    },
}

class Builder extends Component {
    state = {
        size: 'small',
        ingredients: {},
    }

    constructor(props) {
        super(props);
        ingredient_list.forEach(i => {
            this.state.ingredients[i.name] = 0
        })
        console.log('this.state.ingredients: ', this.state.ingredients)
    }

    setIngredient = (ingredient, quantity) => {
        if (!(ingredient in this.state.ingredients))
        {
            console.log("Ingredient \"" + ingredient + "\" not found")
            return;
        }
        // console.log('this.state.ingredients: ', this.state.ingredients)
        const ingredientsCopy = {...this.state.ingredients};
        // console.log('ingredientsCopy:', ingredientsCopy)
        ingredientsCopy[ingredient] = quantity;
        this.setState({
            ingredients: ingredientsCopy,
        })
    }

    render() {
        return (
            <div className="builder">
            <Controls>
                <Control
                    name="pepperoni"
                    removeFunc={this.setIngredient.bind(this, 'pepperoni', 0)}
                    addFunc={this.setIngredient.bind(this, 'pepperoni', 1)}
                    doubleFunc={this.setIngredient.bind(this, 'pepperoni', 2)}
                />
            </Controls>
            <Preview ingredients={this.state.ingredients}/>
            <button className="checkout">Checkout</button>
            </div>
        )
    }
}

export default Builder;