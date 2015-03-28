import React from 'react/addons'
import {Link, State} from "react-router"
import {portfolio as Actions} from 'actions'
import Spinner from 'Spinner'

import './projectItem.less'

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
      return (
        <div className="container">
          <div className="col-md-8 col-xs-12">
            <div className="card">
              <article>
                <h2>
                  <Link to="/portfolio"><div className="btn-back" /></Link>
                  { this.props.currentProject.title }
                  <p className="sub">Last Updated on {this.props.currentProject.updated}</p>
                </h2>
                <p>{ this.props.currentProject.brief }</p>
              </article>
            </div>
            <div className="card">
              <article>
                <h4>The Work</h4>
                <p>{ this.props.currentProject.work }</p>
              </article>
            </div>
            <div className="card">
              <article>
                <h4>The Challenge</h4>
                <p>{this.props.currentProject.challenge}</p>
              </article>
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="card">
              <article>
                <h4>Technologies Used</h4>
                <p dangerouslySetInnerHTML = {{__html: this.props.currentProject.techs}} />
                <br />
                <h4>Project Vitals</h4>
                <p dangerouslySetInnerHTML = {{__html: this.props.currentProject.vitals}} />
                <br />
                <span className="label info">{this.props.currentProject.type}</span>
              </article>
            </div>
            <div className="card">
              <article>
                <h4>Features</h4>
                <p dangerouslySetInnerHTML = {{__html: this.props.currentProject.features}} />
              </article>
            </div>
          </div>
        </div>
      );
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