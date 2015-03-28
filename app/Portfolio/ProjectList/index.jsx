import React from 'react/addons'
import {Link} from "react-router"
import Spinner from 'Spinner'
import _ from 'lodash'
import Isotope from 'isotope-layout'
import ImagesLoaded from 'imagesloaded'
import {portfolio as Actions} from 'actions'
import {State as RouterState} from "react-router"

import './projectList.less'

export default React.createClass({
    propTypes: {
      projects : React.PropTypes.array
    },
    mixins: [RouterState],
    initIsotope() {
      var sort = this.getQuery().sort;
      var opts = {
        itemSelector : '.queueItem',
        layoutMode : 'masonry',
        masonry: {
          gutter: 20,
          isFitWidth: true
        },
        hiddenStyle: {
          opacity: 0
        },
        visibleStyle: {
          opacity: 1
        },
        filter: (itemElm) => {
          if(!sort || sort==="all") {
            return true;
          }
          return itemElm.className.indexOf(sort) >= 0;
        }
      }
      this.projects = new Isotope(this.refs.isotopeContainer.getDOMNode(), opts)
      ImagesLoaded(this.refs.isotopeContainer.getDOMNode(), () => {
        this.projects.layout();
      })
    },
    relayout() {
      ImagesLoaded(this.refs.isotopeContainer.getDOMNode(), () => {
        this.projects.layout();
        this.filterIsotope();
      });
    },
    filterIsotope() {
      var sort = this.getQuery().sort;
      this.projects.arrange({
        filter: (itemElm) => {
            if(!sort || sort==="all") {
              return true;
            }
            return itemElm.className.indexOf(sort) >= 0;
          }
      });
    },
    componentDidMount() {
      if(this.props.projects) {
        this.initIsotope();
      } else {
        Actions.load();
      }
    },
    componentDidUpdate() {
      if(!this.props.projects) {
        return ;
      }
      if(this.projects) {
        this.relayout();
      } else {
        this.initIsotope();
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
      return <div className={`queueItem ${_.camelCase(project.type)}`}>
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
    renderBody() {
      if(!this.props.projects) {
        return <Spinner />;
      }
      return <div className="isotope-container" ref="isotopeContainer">
        {this.renderList()}
      </div>;
    },
    render() {
        return <div className="queue">
            <div className="container">
              { this.renderBody() }
            </div>
        </div>;
    }
});
