import React from 'react/addons'
import {Link, State} from "react-router"
import {portfolio as Actions} from 'actions'
import Spinner from 'Spinner'
import LangComp from './langComposition'
import Snabbt from "snabbt.js"
import _ from "lodash";
import './projectItem.less'

//CONSTS
var TOOLTIP_DEF = {
  'php' : 'PHP',
  'javascript' : 'Javascript',
  'html5Css3' : 'HTML5/CSS3',
  'c' : 'C/C++',
  'ruby' : 'Ruby',
  'other' : 'Other'
};

export default React.createClass({
    propTypes: {
      currentProject : React.PropTypes.object
    },
    contextTypes: {
      router: React.PropTypes.func
    },
    generateLangComp() {
      var languages = JSON.parse(this.props.currentProject.languages);
      if(languages.length) {
        return languages.map((item) => <LangComp data={item[1]} name={item[0]} tooltip={TOOLTIP_DEF[_.camelCase(item[0])]} />);
      }
    },
    initSnabbt() {
      var ldom = React.findDOMNode(this.refs.languageStats);
      if(ldom) {
        Snabbt(ldom, {
          delay:1000,
          easing: 'easeOut',
          position:[0,0,0],
          fromPosition: [-ldom.offsetWidth,0,0],
          duration: 500,
          opacity: 1,
          fromOpacity: 0
        });
        // set overflow back to inherit to allow tooltips
        _.delay(()=>{
          React.findDOMNode(this.refs.titleCard).style.overflow = "initial";
        }, 2000);
      }
    },
    componentDidMount() {
      var id = this.context.router.getCurrentParams().id
      if(!this.props.currentProject) {
        Actions.loadProject(id);
      }
      this.initSnabbt();
    },
    componentDidUpdate() {
      this.initSnabbt();
    },
    componentWillUnmount() {
      var id = this.context.router.getCurrentParams().id
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
              <article className="titleCard" ref="titleCard">
                <div className="languageStats" ref="languageStats">
                  { this.generateLangComp() }
                </div>
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
    render() {
        return <div className="projectItem">
            {this.renderBody()}
        </div>;
    }
});

