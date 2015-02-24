import React from 'react/addons'
import {Link} from "react-router"

import './style.less'

export default React.createClass({
    getInitialState() {
        return {
            menuToggle: false
        };
    },
    mixins: [React.addons.PureRenderMixin],
    toggleMenu() {
        this.setState({
            menuToggle: !this.state.menuToggle
        });
    },
    cxMenu() {
        return React.addons.classSet({
          'toggled': this.state.menuToggle
        });
    },
    render() {
        return <div className="home">
            <header id="header">
                <div className="container">
                    <div id="site-title" className="clearfix">
                        <div className="subtitle">Xin Wei</div>
                        <button className="btn btn-default btn-lg navButton" type='button' onClick={this.toggleMenu}>
                            <i className="fa fa-bars" />
                        </button>
                        <nav id="siteNav" className={`nav-collapse ${this.cxMenu()}`}>
                            <div className="navContainer">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><Link to="portfolio">Portfolio</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="row cover">
                <div className="wrapper">
                    <div className="container about">
                        <div className="thumbWrapper">
                            <img className="profile" src={require('./assets/thumb.jpg')} />
                        </div>
                        <h2> Hello there! </h2>
                        <p className="light center"> My name is Xin Wei, and I&#039;m a software engineer living in San Jose, CA. I love creating simple, clean designs for web and mobile, and use the latest web technologies to craft responsive, interactive and user-friendly websites. </p>
                        <br />
                        <ul className="socialLinks">
                            <li><a className="https://www.linkedin.com/in/trekforever"><i className="fa fa-linkedin" /></a></li>
                            <li><a className="https://twitter.com/trekforever"><i className="fa fa-twitter" /></a></li>
                            <li><a className="https://plus.google.com/u/0/111807495882361387546/"><i className="fa fa-google-plus" /></a></li>
                            <li><a className="https://github.com/trekforever"><i className="fa fa-github" /></a></li>
                            <li><a className="http://stackoverflow.com/users/1547196/trekforever"><i className="fa fa-stack-overflow" /></a></li>
                        </ul>
                        <br />
                        <p className="subheader">San Jose · San Francisco · Web Developer · Software Engineer</p>
                    </div>
                    <div className="heroBg" />
                </div>
            </div>
        </div>;
    }
});
