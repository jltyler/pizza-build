// Data file for shared data
const ingredientPrices = {
    'pepperoni': 0.5,
    'mushrooms': 0.725,
    'black olives': 0.65,
    'pineapple': 0.8,
    'onions': 0.6,
    'anchovies': 1.75,
};

const basePrice = 8.0;

const sizeTable = {
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
};

const ingredientNames = Object.keys(ingredientPrices);

const Data = {
    basePrice,
    ingredientPrices,
    sizeTable,
    ingredientNames,
};

export default Data;