import Helpers from './Helpers';

const defaultOptions = {
    number: 0,
    attempts: 30,
    cullDistance: 0,
};

/**
 * Generates and returns a list of coordinate pairs using Poisson-Disc sampling algorithm
 * @arg {number} width - Width of field to generate points in
 * @arg {number} height - Height of field to generate points in
 * @arg {number} minDistance - Minimum distance between points
 * @arg {Object} [options] - Other options for generation
 * @arg {number} options.number - Number of points to generate. Attempts to fill space if this is 0
 * @arg {number} options.attempts - Number of attempts to generate a point before giving up on that point. Defaults to 30
 * @arg {number} options.cullDistance - Any points further than this from the center of the field are removed from the final sample list
 *
 * @returns {Array} - Array of generated coordinate pairs
*/

const generateSamples = (width, height, minDistance, options = {}) => {
    options = {...defaultOptions, ...options};

    // Some precalculations
    const cullDistance2 = Math.pow(options.cullDistance, 2);
    const minDistance2 = Math.pow(minDistance, 2);
    const center = [width / 2, height / 2];

    // Diagonal cell length must be less than minimum distance to ensure a maximum of one point per cell
    const cellSize = Math.floor(minDistance * 0.7071067811);
    const gridWidth = Math.floor(width / cellSize) + 1;
    const gridHeight = Math.floor(height / cellSize) + 1;
    const grid = Array(gridWidth);
    for(let i = 0; i < gridWidth; ++i)
    {
        grid[i] = Array(gridHeight);
    };

    const samples = []; // Stores coordinate pairs for confirmed points

    /**
     * Takes coordinate pair and returns cell coordinates inside grid
     * @arg {number[]} coords - Coordinate pair
     * @returns {number[]} Grid coordinate pair
    */
    const gridCoords = (coords) => {
        return [
            Math.floor(coords[0] / cellSize),
            Math.floor(coords[1] / cellSize),
        ];
    };

    /**
     * Searches neighboring cells and returns a list of indexes of neighboring points
     * @param {number[]} coords Grid coordinate pair to check around
     * @returns {number[]} Indexes of neighboring points
     */
    const getNeighbors = (coords) => {
        const relativePositions = [
            [-1, -2], [0, -2], [1, -2],
            [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
            [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
            [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
            [-1, 2], [0, 2], [1, 2],
        ];
        const neighbors = [];
        for(let i = 0; i < relativePositions.length; ++i)
        {
            const nx = coords[0] + relativePositions[i][0];
            const ny = coords[1] + relativePositions[i][1];
            // If the cell is out of bounds or empty we skip forward
            if (nx < 0 || nx >= gridWidth || ny < 0 || ny >= gridHeight || grid[nx][ny] === undefined) continue;
            neighbors.push(grid[nx][ny]);
        };
        return neighbors;
    };

    /**
     * Checks for any existing points around a new point
     * @param {number[]} coords Coordinate pair
     * @returns {boolean} True if no points are nearby, false otherwise
     */
    const checkDistance = (coords) => {
        const gc = gridCoords(coords);
        const neighbors = getNeighbors(gc);
        for (let i = 0; i < neighbors.length; i++) {
            const compareCoords = samples[neighbors[i]];
            const distance = Math.pow(coords[0] - compareCoords[0], 2) + Math.pow(coords[1] - compareCoords[1], 2);

            if (distance <= minDistance2)
            {
                return false;
            }
        }

        return true;
    };

    /**
     * Attempts to generate a new point using a reference point to check around
     * @param {number[]} referenceCoords Coordinate pair
     * @returns {(number[]|undefined)} The new coordinate pair if successful, undefined if ran out of attempts
     */
    const findPoint = (referenceCoords) => {
        for(let i = options.attempts; i > 0; --i)
        {
            const dist = Math.random() * minDistance + minDistance;
            const dir = Math.random() * Math.PI * 2;
            const newPoint = [
                referenceCoords[0] + Math.cos(dir) * dist,
                referenceCoords[1] + Math.sin(dir) * dist,
            ];
            if (newPoint[0] < 0 || newPoint[0] >= width || newPoint[1] < 0 || newPoint[1] >= height) continue;
            if (checkDistance(newPoint)) return newPoint;
        }

        return undefined;
    };

    // Start of actual generation
    const startPoint = [Math.random() * width, Math.random() * height];
    samples.push(startPoint);
    const activePoints = [0];
    // First point grid location
    const startCell = gridCoords(startPoint);
    grid[startCell[0]][startCell[1]] = 0;

    while(activePoints.length > 0 && samples.length !== options.number) {
        const refIndex = Helpers.choose(activePoints);
        const refCoords = samples[refIndex];
        const newPoint = findPoint(refCoords);
        if (newPoint !== undefined)
        {
            const index = samples.length;
            samples.push(newPoint);
            activePoints.push(index);
            const newCell = gridCoords(newPoint);
            grid[newCell[0]][newCell[1]] = index;
        }
        else
        {
            activePoints.splice(activePoints.indexOf(refIndex), 1);
        }
    }

    return (cullDistance2 <= 0) ? samples : samples.filter((s) => (Math.pow(s[0] - center[0], 2) + Math.pow(s[1] - center[1], 2) < cullDistance2));
};

export default generateSamples;