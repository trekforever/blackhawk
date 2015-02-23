import React from 'react/addons'
import {Link} from "react-router"

export default React.createClass({
    render() {
        return <div>
            <h2>Project List</h2>
            <ul>
                <li><Link to="/portfolio/projects/1">Project 1</Link></li>
                <li><Link to="/portfolio/projects/41">Project 41</Link></li>
            </ul>
        </div>;
    }
});
