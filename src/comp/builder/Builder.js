import React, {Component} from 'react';
import Preview from './preview/Preview';
import Controls from './controls/Controls';
import Control from './controls/Control';
import Store from './Store';
import Data from '../../Data';
import Helpers from '../../Helpers';
import './Builder.css';
import Modal from '../modal/Modal';
import Confirm from '../confirm/Confirm';

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
            this.state=(this.newBuilderOrder())
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

    renderIngredients = () => {
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

    changeSize = (e) => {
        this.setState({
            size: e.target.value,
        })
    }

    sendOrder = (e) => {
        const order = {
            size: this.state.size,
            ingredients: {...this.state.ingredients},
            total: Helpers.calculateTotalPrice(this.state),
        }
        for (const key in order.ingredients) {
            if (order.ingredients[key] === 0) delete order.ingredients[key];
        }
        Store.history.push(order)
        this.setState(this.newBuilderOrder())
        this.refreshAppState()
    }

    newBuilderOrder = () => {
        const ingredients = {};
        for (const i in Data.ingredientPrices) ingredients[i] = 0;
        return {
            size: 'small',
            ingredients,
            confirm: false,
        }
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
        this.setState({
            confirm: true,
        })
    }

    render() {
        return (
            <div className="builder">
                <Modal show={this.state.confirm}>
                    <Confirm
                        order={{
                            ...this.state,
                            total: Helpers.calculateTotalPrice(this.state),
                            }}
                        confirmOrder={this.sendOrder}/>
                </Modal>
                <Controls>
                    Size:
                    <select onChange={this.changeSize} value={this.state.size}>
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
                    Total: {Helpers.calculateTotalPrice(this.state).toFixed(2)}
                </div>
                <button className="checkout" onClick={this.displayCheckout}>Order</button>
            </div>
        )
    }
}

export default Builder;