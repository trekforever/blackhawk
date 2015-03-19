import React from 'react/addons'
import {Link, State} from "react-router"
import {portfolio as Actions} from 'actions'
import Spinner from 'Spinner'

export default React.createClass({
    propTypes: {
      currentProject : React.PropTypes.object
    },
    componentDidMount() {
      var id = this.getParams().id
      if(!this.props.currentProject) {
        Actions.loadProject(id);
      }
    },
    componentWillUnmount() {
      var id = this.getParams().id
      Actions.unloadProject(id);
    },
    renderBody() {
      if(!this.props.currentProject) {
        return <Spinner />;
      }
      return <div className="container"><h1>{this.props.currentProject.title}</h1></div>
    },
    mixins: [State],
    render() {
        return <div className="projectItem">
            {this.renderBody()}
        </div>;
    }
});

//Animate in Lang Composition, start with translateX(-100%), opacity 0, and overflow hidden on parent
//Once transitioned properly, add class to set overflow back to auto and display tooltips