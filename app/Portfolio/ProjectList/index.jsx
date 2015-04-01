import React from 'react/addons'
import {Link} from "react-router"
import Spinner from 'Spinner'
import _ from 'lodash'
import Isotope from 'isotope-layout'
import ImagesLoaded from 'imagesloaded'
import {portfolio as Actions} from 'actions'
import {State as RouterState} from "react-router"

import './projectList.less'

var ISOTOPE_COUNT = 0;

export default class ProjectList extends React.Component {
  static propTypes = {
    projects : React.PropTypes.array
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  initIsotope() {
    var opts = {
      itemSelector : '.queueItem',
      layoutMode : 'masonry',
      masonry: {
        gutter: 20,
        isFitWidth: true
      }
    }
    this.projects = new Isotope(React.findDOMNode(this.refs.isotopeContainer), opts)
    ImagesLoaded(React.findDOMNode(this.refs.isotopeContainer), () => {
      this.projects.layout();
      ISOTOPE_COUNT = this.projects.getItemElements().length;
    })
  }
  relayout() {
    // hide initially
    ImagesLoaded(React.findDOMNode(this.refs.isotopeContainer), () => {
      this.projects.reloadItems();
      this.projects.layout();
      this.projects.arrange();
    });
  }
  /* RENDER METHODS */
  renderTags(project) {
    return <div className="tags">
      <span className="label info">{project.type}</span>
      { project.stacks.map((v,i) => {
        return <span className="label" key={i}>{v}</span>;
      }) }
    </div>;
  }
  renderList() {
    var projects = this.props.projects;
    return projects.map((project, i) => 
      <div key={i} className={`queueItem ${_.camelCase(project.type)}`}>
        <article>
          <figure>
            <Link to={`/portfolio/projects/${_.kebabCase(project.title)}`}>
              <img ref="image" src={`/static/portfolioAssets/${project.picture}`} />
            </Link>
          </figure>
          <summary>
            <h4>{project.title}</h4>
            <div className="brief">{project.brief}</div>
            { this.renderTags(project) }
          </summary>
        </article>
    </div>)
  }
  renderBody() {
    if(!this.props.projects) {
      return <Spinner />;
    }
    return <div className="isotope-container" ref="isotopeContainer">
      {this.renderList()}
    </div>;
  }
  /* LIFECYCLE METHODS */
  componentDidMount() {
    if(this.props.projects) {
      this.initIsotope();
    } else {
      Actions.load();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.props.projects) {
      return ;
    }
    if(this.projects) {
      this.relayout();
    } else {
      this.initIsotope();
    }
  }
  componentWillUnmount() {
    if(this.projects) {
      this.projects.destroy();
    }
  }
  render() {
      return <div className='queue'>
          <div className="container">
            { this.renderBody() }
          </div>
      </div>;
  }
}
