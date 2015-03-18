import React from 'react/addons'
import {Link} from "react-router"
import Spinner from 'Spinner'
import _ from 'lodash'
import Isotope from 'isotope-layout'
import ImagesLoaded from 'imagesloaded'

import './projectList.less'

export default React.createClass({
    propTypes: {
      projects : React.PropTypes.array.isRequired
    },
    componentDidMount() {
      this.projects = new Isotope(this.refs.isotopeContainer.getDOMNode(), {
        itemSelector: '.queueItem',
        layoutMode: 'masonry',
        masonry: {
          gutter: 20,
          isFitWidth: true
        },
        hiddenStyle: {
          opacity: 0
        },
        visibleStyle: {
          opacity: 1
        }
      })
      ImagesLoaded(this.refs.isotopeContainer.getDOMNode(), () => {
        this.projects.layout();
      })
    },
    componentDidUpdate() {
      if(this.projects) {
        ImagesLoaded(this.refs.isotopeContainer.getDOMNode(), () => {
          this.projects.reloadItems();
          this.projects.layout();
          this.projects.arrange();
        });
      }
    },
    componentWillUnmount() {
      if(this.projects) {
        this.projects.destroy();
      }
    },
    renderTags(project) {
      return <div className="tags">
        <span className="label info">{project.type}</span>
        { project.stacks.map((v,i) => {
          return <span className="label" key={`label${i}`}>{v}</span>;
        }) }
      </div>;
    },
    renderItem(project) {
      return <div className="queueItem">
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
      </div>;
    },
    renderList() {
        return this.props.projects.map((project) => {
          var item = this.renderItem(project);
          return {item};
        })
    },
    render() {
        return <div className="queue">
            <div className="container">
              <div className="isotope-container" ref="isotopeContainer">
                {this.renderList()}
              </div>
            </div>
        </div>;
    }
});
