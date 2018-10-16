import React from 'react';
import './Preview.css'
import Helpers from '../../../Helpers';

const width = 400;
const height = 400;
const cull_center_distance = Math.pow(180, 2); // Distance (squared) of culling edge
const min_distance = 40; // Minimum distance between points
const min_distance2 = min_distance * min_distance;
const attempts = 20; // Max attempts at generating a new point before giving up

const cell_size = min_distance / 1.41421;
const grid_width = Math.floor(width / cell_size) + 1;
const grid_height = Math.floor(height / cell_size) + 1;
const grid = Array(grid_width);
for(let i = 0; i < grid_width; ++i)
{
    grid[i] = Array(grid_height);
};

const samples = [];
const active_points = [];

const grid_coords = (coords) => {
    return [
        Math.floor(coords[0] / cell_size),
        Math.floor(coords[1] / cell_size),
    ];
};

const get_neighbors = (coords) => {
    const relative_positions = [
        [-1, -2], [0, -2], [1, -2],
        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
        [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
        [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
        [-1, 2], [0, 2], [1, 2],
    ];
    const neighbors = [];
    for(let i = 0; i < relative_positions.length; ++i)
    {
        const nx = coords[0] + relative_positions[i][0];
        const ny = coords[1] + relative_positions[i][1];
        if (nx < 0 || nx >= grid_width || ny < 0 || ny >= grid_height || grid[nx][ny] === undefined) continue;
        neighbors.push(grid[nx][ny]);
    };
    return neighbors;
}

const check_distance = (coords) => {
    const gc = grid_coords(coords);
    const neighbors = get_neighbors(gc);
    for (let i = 0; i < neighbors.length; i++) {
        const compare_coords = samples[neighbors[i]];
        const distance = Math.pow(coords[0] - compare_coords[0], 2) + Math.pow(coords[1] - compare_coords[1], 2);
        if (distance <= min_distance2) return false;
    }
    return true;
};

const find_point = (reference_coords) => {
    for(let i = attempts; i > 0; --i)
    {
        const dist = Math.random() * min_distance + min_distance;
        const dir = Math.random() * Math.PI * 2;
        const new_point = [
            reference_coords[0] + Math.cos(dir) * dist,
            reference_coords[1] + Math.sin(dir) * dist,
        ];
        if (new_point[0] < 0 || new_point[0] >= width || new_point[1] < 0 || new_point[1] >= height) continue;
        if (check_distance(new_point)) return new_point;
    }
    return undefined;
}

// Start of actual generation
const start_point = [width / 2, height / 2];
samples.push(start_point);
// First point grid location
const start_cell = grid_coords(start_point);
grid[start_cell[0]][start_cell[1]] = 0;
active_points.push(0);

while(active_points.length > 0) {
    const ref_index = Helpers.choose(active_points);
    const ref_coords = samples[ref_index];
    const new_point = find_point(ref_coords);
    if (new_point !== undefined)
    {
        const index = samples.length;
        samples.push(new_point);
        active_points.push(index);
        const new_cell = grid_coords(new_point);
        grid[new_cell[0]][new_cell[1]] = index;
    }
    else
    {
        active_points.splice(active_points.indexOf(ref_index), 1); 
    }
}

const positions = samples.filter(s => {
    const dx = s[0] - width / 2;
    const dy = s[1] - height / 2;
    if (dx * dx + dy * dy > cull_center_distance) return false;
    return true;
})

const ListIngredients = (ingredients) => {
    const ret_list = [];
    for (const i in ingredients)
    {
        ret_list.push(<div key={i}>name: {i}<br />count: {ingredients[i]}</div>);
    }
    return ret_list
}

const Preview = (props) => {
    return (
        <div className="preview">
            <div className="pizza-base">
                {positions.map((p, i) => {
                    return <div
                        className="pepperoni"
                        style={{
                            left: p[0] - 10,
                            top: p[1] - 10,
                        }}
                        key={i}></div>
                })}

            </div>
            {/* {ListIngredients(props.ingredients)} */}
        </div>
    )
}

export default Preview;