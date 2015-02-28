import React from 'react/addons'
import {Link} from "react-router"
import {WOW} from "wow/dist/wow"
import './style.less'

var Home = React.createClass({
    wow: null,
    getInitialState() {
        return {
            menuToggle: false
        };
    },
    componentWillMount() {
        this.wow = new WOW().init();
    },
    componentDidMount() {
        // Used to track the enabling of hover effects
        var enableTimer = 0;
        /*
         * Listen for a scroll and use that to remove
         * the possibility of hover effects
         */
        window.addEventListener('scroll', () => {
          clearTimeout(enableTimer);
          removeHoverClass();

          // enable after 1 second, choose your own value here!
          enableTimer = setTimeout(addHoverClass, 1000);
        }, false);

        /**
         * Removes the hover class from the body. Hover styles
         * are reliant on this class being present
         */
        function removeHoverClass() {
          document.body.classList.remove('hover');
        }

        /**
         * Adds the hover class to the body. Hover styles
         * are reliant on this class being present
         */
        function addHoverClass() {
          document.body.classList.add('hover');
        }
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
            <div className="container resContainer wow fadeIn" data-wow-duration="3s" data-wow-offset="10">
                <div className="row-fluid">
                    <h2> My Work </h2>
                    <img className="companyLogo wow fadeInLeft" src={require('./assets/trapit-logo.svg')} width="300px" data-wow-duration="3s" />
                    <p className="light">I&#039;m currently a software engineer at <a href="https://trap.it">Trapit</a>, a spin-off of <a href="http://www.sri.com/">SRI International</a> that uses artifical intelligence for content discovery and curation.</p>
                    <p className="light center">My current weapons of choice include various modern Javascript MVC Frameworks (Backbone, Ember, Angular), Facebook React (as well as Flux Architecture), Clojurescript (Om and Reagent), Socket.IO, a variety of workflow tools like Gulp, Webpack, Jade Templating, Git, ES6 Harmony, and various unit testing frameworks (Jasmine and Jest). Of course I also enjoy coding server-side languages like Node, PHP, C/C++, and Java.</p>
                </div>
            </div>
            <div className="row-fluid darkBg2 darkBg">
                <div className="container resContainer wow fadeIn" data-wow-duration="3s">
                    <h2> Hobbies and Interests </h2>
                    <p className="dark center">In my free time, I enjoy learning new languages, reading <a href="https://news.ycombinator.com/news">Hacker News</a>, solving Javascript puzzles, working on my side projects, and spending hours on Reddit (too addicting).
                        <br /><br />
                        But don&#039;t worry, I also spend plenty of time not near a computer as well! I enjoy hanging out with friends (food adventures, movies, music concerts, snowboarding, hiking, traveling, exploring new areas, board game nights), traveling to different states and countries, and going to various entrepreneurial/tech meet-ups in San Francisco (a good way to learn what other cool startups are doing)! And oh yes I love food adventures ... did I mention that already?
                    </p>
                </div>
            </div>
            <div className="container resContainer wow fadeIn" data-wow-duration="3s" data-wow-offset="10">
                <div className="row-fluid">
                    <h2> Education </h2>
                    <p className="light center">Bachelor of Science in Computer Science and Engineering</p>
                    <p className="light center sub">
                    UCLA School of Engineering and Applied Science
                    <br />
                    Class of 2013
                    <br />
                    Cumulative GPA 3.6, Major GPA 3.5
                    <br />
                    <br />
                    <img src={require('./assets/ucla.png')} align="center" width="300px" />
                    </p>
                </div>
            </div>
            <footer className="darkBg">
                <div className="container resContainer">
                    <p className="center">Ahh! You reached the bottom of the page already! <a href="#">Go back to top?</a></p>
                </div>
            </footer>
        </div>;
    }
});
export default Home;
