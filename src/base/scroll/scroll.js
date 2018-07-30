import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import "./scroll.css";

const DEFAULT_OPTIONS={
  observeDOM:false,
  click: true,
  probeType: 1,
  // scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false
}
class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  
  componentDidMount() {
    this.initScroll()
  }
  componentDidUpdate(nextState) {
    this.scroll && this.refresh()
  }
  refresh(){
    this.refreshTimer=setTimeout(() => {
      this.forceUpdate(true)
    }, 20);
  }
  forceUpdate(dirty=false){
    this.scroll.refresh()
  }
  initScroll(){
    this.scrollWrapper = this.refs.scrollWrapper;
    // this.scrollWrapper = ReactDOM.findDOMNode(this.refs.scrollWrapper);
    if(!this.scroll){
      let options = Object.assign({}, DEFAULT_OPTIONS, this.props.options);
      this.scroll = new BScroll(this.scrollWrapper, options);
    }
    
  }
  render(){
    const {className=""}=this.props;
    return (
      <div className={`scroll-wrapper ${className}`} ref="scrollWrapper">
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
Scroll.propTypes-{
  className:PropTypes.string
}
export default Scroll