import React from 'react/addons'
import {Link, State} from "react-router"

export default React.createClass({
    mixins: [State],
    render() {
        return <div>
            <h2>{`Project Item ${this.getParams().id}`}</h2>
        </div>;
    }
});

//Animate in Lang Composition, start with translateX(-100%), opacity 0, and overflow hidden on parent
//Once transitioned properly, add class to set overflow back to auto and display tooltips