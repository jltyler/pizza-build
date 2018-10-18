import React, {Component} from 'react';
import Preview from './preview/Preview';
import Controls from './controls/Controls';
import Control from './controls/Control';
import Store from './Store';
import Data from '../../Data';
import './Builder.css';
import SizeControl from './controls/SizeControl';

class Builder extends Component {
    constructor(props) {
        super(props);

        // Retrieve builder from Store if it's in there
        if ('builder' in Store) {
            this.state = Store.builder;
            delete Store.builder;
        }
        else
        {
            // Assigning state once in the constructor is okay but mutating it is not
            const newIngredients = {};
            Data.ingredientNames.forEach((name) => {
                newIngredients[name] = 0;
            })

            this.state = {
                size: 'small',
                ingredients: newIngredients,
            }
        }
        this.refreshAppState = props.refreshAppState;
    }

    setIngredient = (ingredient, quantity) => {
        if (!(ingredient in this.state.ingredients))
        {
            console.error("Ingredient \"%s\" not found", ingredient)
            return;
        }
        const ingredientsCopy = {...this.state.ingredients};
        ingredientsCopy[ingredient] = quantity;
        this.setState({
            ingredients: ingredientsCopy,
        })
    }

    renderIngredientControls = () => {
        const ingredients = []
        for (const i in this.state.ingredients) {
            ingredients.push(
                <Control
                    key={i}
                    name={i}
                    removeFunc={() => this.setIngredient(i, 0)}
                    addFunc={() => this.setIngredient(i, 1)}
                    doubleFunc={() => this.setIngredient(i, 2)}
                    current={this.state.ingredients[i]}
                />
            )
        }
        return ingredients;
    }

    calculateTotalPrice = () => {
        let price = Data.basePrice;
        for (const i in this.state.ingredients) {
            price += this.state.ingredients[i] * Data.ingredientPrices[i];
        }
        return price * Data.sizeTable[this.state.size].multiplier;
    }

    changeSize = (newSize) => {
        this.setState({
            size: newSize,
        })
    }

    sendOrder = (e) => {
        const order = {
            size: this.state.size,
            ingredients: {...this.state.ingredients},
            total: this.calculateTotalPrice()
        }
        for (const key in order.ingredients) {
            if (order.ingredients[key] === 0) delete order.ingredients[key];
        }
        Store.history.push(order)
        this.refreshAppState()
    }

    storeBuilderState = () => {
        Store.builder = {
            size: this.state.size,
            ingredients: {...this.state.ingredients}
        }
    }

    componentWillUnmount() {
        this.storeBuilderState()
    }

    displayCheckout = () => {
        this.props.setCurrentDisplay('confirm', this.state)
    }

    render() {
        return (
            <div className="builder">
                <Controls>
                    <SizeControl size={this.state.size} changeSize={this.changeSize}/>
                    {this.renderIngredientControls()}
                </Controls>
                <Preview ingredients={this.state.ingredients}>
                    <div className="total">
                        {this.state.size[0].toUpperCase() + this.state.size.slice(1)} pizza <br />
                        <span>Total:</span> ${this.calculateTotalPrice(this.state.ingredients).toFixed(2)}
                    </div>
                </Preview>
                <button className="checkout" onClick={this.displayCheckout}> Review Order</button>
            </div>
        )
    }
}

export default Builder;