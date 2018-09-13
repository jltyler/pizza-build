import React, {Component} from 'react';
import Preview from './preview/Preview';
import Controls from './controls/Controls';
import Control from './controls/Control';
import './Builder.css';

const base_price = 8.0;

const ingredient_prices = {
    'pepperoni': 0.5,
    'mushrooms': 0.725,
    'black olives': 0.65,
    'anchovies': 1.5,
}

const size_table = {
    small: {
        diameter: '8 inches',
        multiplier: 1.0,
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
    constructor(props) {
        super(props);

        // Assigning state once in the constructor is okay but mutating it is not
        const temp_ingredients = {};
        for (const i in ingredient_prices)
        {
            temp_ingredients[i] = 0;
        }

        this.state = {
            size: 'small',
            ingredients: temp_ingredients,
        }
        // console.log('this.state.ingredients: ', this.state.ingredients)
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

    renderIngredients = () => {
        const ingredients = []
        for (const i in this.state.ingredients) {
            ingredients.push(
                <Control
                    key={i}
                    name={i}
                    removeFunc={this.setIngredient.bind(this, i, 0)}
                    addFunc={this.setIngredient.bind(this, i, 1)}
                    doubleFunc={this.setIngredient.bind(this, i, 2)}
                />
            )
        }
        return ingredients;
    }

    calculateTotalPrice = () => {
        let price = base_price;
        for (const i in this.state.ingredients) {
            price += this.state.ingredients[i] * ingredient_prices[i];
        }
        return price * size_table[this.state.size].multiplier;
    }

    changeSize = (e) => {
        // console.log('e.target.value:', e.target.value)
        this.setState({
            size: e.target.value,
        })
    }

    render() {
        return (
            <div className="builder">
                <Controls>
                    Size:
                    <select onChange={this.changeSize}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="party">Party</option>
                    </select>
                    {this.renderIngredients()}
                </Controls>
                <Preview ingredients={this.state.ingredients}/>
                <div className="total">
                    Size: {this.state.size} <br />
                    Total: {this.calculateTotalPrice().toFixed(2)}
                </div>
                <button className="checkout">Checkout</button>
            </div>
        )
    }
}

export default Builder;