import React from 'react/addons'
import {Link} from "react-router"
import Spinner from 'Spinner'
import _ from 'lodash'

export default React.createClass({
    renderList() {
        return this.props.projects.map((project) => {
          var id = _.kebabCase(project.title);
          return <li><Link to={`/portfolio/projects/${id}`}>{project.title}</Link></li>
        })
    },
    render() {
        return <div>
            <h2>Project List</h2>
            <ul>
                {this.renderList()}
            </ul>
        </div>;
    }
});
