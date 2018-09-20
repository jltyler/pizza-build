import Data from './Data';

const Helpers = {
    calculateTotalPrice: (order) => {
        let price = Data.base_price;
        for (const i in order.ingredients) {
            price += order.ingredients[i] * Data.ingredient_prices[i];
        }
        return price * Data.size_table[order.size].multiplier;
    }
};

export default Helpers;