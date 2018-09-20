const Data = {
    base_price: 8.0,

    ingredient_prices: {
        'pepperoni': 0.5,
        'mushrooms': 0.725,
        'black olives': 0.65,
        'anchovies': 1.5,
    },

    size_table: {
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
    },
};

export default Data;