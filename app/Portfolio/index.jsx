import React from 'react/addons'
import {RouteHandler} from "react-router"
import {Link} from "react-router"
import Header from './Header'
import Filter from './Filter'

import './style.less';

export default React.createClass({
    render() {
        return <div className="portfolio">
            <Header />
            <Filter />
            <h2>Portfolio</h2>
            <RouteHandler />
        </div>;
    }
});
