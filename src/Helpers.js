import Data from './Data';

const Helpers = {
    /**
     * Takes order Object, then sums and returns total price
     * @param {Object} order Order object
     * @returns {number} Total price
     */
    calculateTotalPrice: function (order)
    {
        let price = Data.basePrice;
        for (const i in order.ingredients) {
            price += order.ingredients[i] * Data.ingredientPrices[i];
        }
        return price * Data.sizeTable[order.size].multiplier;
    },

    /**
     * Chooses a random item from an array or provided arguments. Does not flatten multiple array arguments
     * @param  {...any} args An array of values to choose from OR the values provided as seperate arguments
     * @returns {any} undefined if no args provided; First item if only one non-array type is provided
     */
    choose: function (...args)
    {
        if (args.length === 0) return undefined;
        if (args.length === 1)
        {
            if (!Array.isArray(args[0])) return args[0];
            else return args[0][Math.floor(Math.random() * args[0].length)]
        }
        else return args[Math.floor(Math.random() * args.length)]
    },

    /**
     * Capitalizes first letter of string and returns it
     * @param {string} str String to capitalize
     */
    capitalize: function (str)
    {
        return str[0].toUpperCase() + str.slice(1);
    },
};

export default Helpers;