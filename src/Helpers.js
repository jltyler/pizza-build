import Data from './Data';

const Helpers = {
    calculateTotalPrice: (order) => {
        let price = Data.basePrice;
        for (const i in order.ingredients) {
            price += order.ingredients[i] * Data.ingredientPrices[i];
        }
        return price * Data.sizeTable[order.size].multiplier;
    }
};

export default Helpers;