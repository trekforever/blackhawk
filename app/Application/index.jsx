import React from 'react/addons'
import {RouteHandler} from "react-router"

var Application = React.createClass({
    render() {
        return <div className="app">
            <RouteHandler />
        </div>;
    }
});
export default Application;
