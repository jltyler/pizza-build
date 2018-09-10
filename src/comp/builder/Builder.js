import React, {Component} from 'react';
import Preview from './preview/Preview';
import Controls from './controls/Controls';

class Builder extends Component {
    state = {}

    render() {
        return (
            <div className="builder">
            <Controls></Controls>
            <Preview></Preview>
            </div>
        )
    }
}

export default Builder;