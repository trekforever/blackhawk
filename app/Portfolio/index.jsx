import React from 'react/addons'
import {RouteHandler} from "react-router"
import {Link} from "react-router"

export default React.createClass({
    render() {
        return <div>
            <h2>Portfolio</h2>
            <RouteHandler />
        </div>;
    }
});
