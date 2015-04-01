import React from 'react/addons'
import _ from 'lodash'
import {Tooltip} from 'react-bootstrap'

export default class LangStats extends React.Component {
  static propTypes = {
    name : React.PropTypes.string.isRequired,
    data : React.PropTypes.number.isRequired
  }
  state = {
    tooltipOffset : null
  }
  /* LIFECYCLE METHODS */
  componentDidMount() {
    var elm = React.findDOMNode(this.refs.tooltip).offsetWidth;
    var parent = React.findDOMNode(this).offsetWidth;
    this.setState({
      tooltipOffset: parent/2 - elm/2
    });
  }
  render() {
    var style = {"width": this.props.data.toString()+"%"};
    return (
      <div className={`lang ${_.camelCase(this.props.name)}`} style={style}>
        <Tooltip placement="top" positionLeft={this.state.tooltipOffset} ref="tooltip">{`${this.props.tooltip} - ${style.width}`}</Tooltip>
      </div>
    );
  }
}