import React from "react/addons"
import {Route, DefaultRoute} from "react-router"

// polyfill
if(!Object.assign)
    Object.assign = React.__spread;

// export routes
export default (
    <Route name="app" path="/" handler={require("./Application")}>
        <Route name="portfolio" path="/portfolio" handler={require('./Portfolio')}>
            <Route name="projectItem" path="/portfolio/projects/:id" handler={require('./Portfolio/ProjectItem')} />
        </Route>
        <DefaultRoute name="home" handler={require("./Home")} />
    </Route>
);
