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
