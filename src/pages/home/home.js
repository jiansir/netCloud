import React from 'react';
import {Link} from "react-router-dom";
import './home.scss';
import {connect} from 'react-redux';
import { getBanner} from '../../store/actions';
import Slider from 'react-slick';
import {map} from 'lodash';
import { getPersonalized} from '../../store/actions';
import ColumnList from 'base/columnList/columnList';
import Scroll from 'base/scroll/scroll';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      banners: this.props.banner||[],
      personalized:[] //个人推荐
    }
  }
  componentDidMount(){
    this.props.onGetBanner();
    getPersonalized().then(res=>{
      if(res.data.code==200){
        this.setState({
          personalized:res.data.result
        })
      }
    })
  }

  render(){
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      adaptiveHeight:true,
      arrows:false
    }
    var {banners}=this.props;
    var { personalized}=this.state;
    return(
      <div className="container">
        <Scroll options={{ bounce: false }}>
          <div className="banner">
            <Slider {...settings}>
              {
                map(banners,(banner,index)=>{
                  return (
                    <div
                      className="slide-item"
                      key={banner.targetId + index}>
                      <img src={banner.picUrl} alt="" />
                    </div>
                  )
                })
              }
            </Slider>
          </div>
          <div className="menu">
            <div className="menu-item">
              <div className="menu-icon fm"></div>
              <p>私人FM</p>
            </div>
            <div className="menu-item">
              <div className="menu-icon daily">
                
              </div>
              <p>每日推荐</p>
            </div>
            <div className="menu-item">
              <div className="menu-icon playlist">
                
              </div>
              <p>歌单</p>
            </div>
            <div className="menu-item">
              <div className="menu-icon rank">
                
              </div>
              <p>排行榜</p>
            </div>
          </div>
          <div className="songsheet">
            <h3 className="songsheet-title">
              <span>推荐歌单</span>
            </h3>
            <ColumnList list={personalized} onItemClick={id=>this.props.history.push(`/playlist/${id}`)}/>
          </div>
          
        </Scroll>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    banners: state.getBannerReducer.banner
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    onGetBanner:data=>getBanner(data,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)