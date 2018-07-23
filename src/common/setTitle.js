import React from 'react';
import  PropTypes from 'prop-types';

export default class ReactTitle extends React.Component{
  static propTypes={
    title:PropTypes.string.isRequired
  }

  setTitle(){
    const {title}=this.props;
    document.title=title;
  }
  
  componentDidMount() {
    this.setTitle()
  }
  componentDidUpdate(){
    this.setTitle()
  }
  render(){
    return this.props.children
  }
  
}