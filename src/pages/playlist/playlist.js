import React from 'react';
import {connect} from 'react-redux';
import Scroll from 'base/scroll/scroll';
import {getPlaylistDetail} from 'store/actions';
import { createPlayListDetail} from 'model/playlist';
import MmNav from 'components/mm-nav/mm-nav';
import Loading from 'base/loading/loading';
import './playlist.scss';

class PlayList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      playListData:{},
      loading:true,
      defaultName:'歌单'
    }
  }
  
  componentDidMount() {
    var playListId=this.props.match.params.id;
    getPlaylistDetail(playListId).then(res=>{
      console.log(res);
      if(res.data.code==200){
        this.setState({
          playListData:createPlayListDetail(res.data.result),
          loading:false
        })
      }
    })
  }
  
  render() {
    const { defaultName,loading}=this.state;
    const { name, coverImgUrl, avatarUrl, nickname, playCount, tracks}=this.state.playListData;
    return (
      <div className="playlist mm-wrapper">
        <MmNav title={name} />
        {
          coverImgUrl&&
          <div className="mm-blur mm-blur-min">
            <div
              className="mm-blur-bg"
              style={{ backgroundImage: `url(${coverImgUrl}?param=100y100)` }}
            />
          </div>
        }
        {
          loading ? <Loading />:
          <header className="playlist-header">
            <div className="mm-blur">
              <div
                className="mm-blur-bg"
                style={{ backgroundImage: `url(${coverImgUrl}?param=100y100)` }}
              />
            </div>
            <div className="playlist-header-wrapper">
              <div className="playlist-header-hd" data-play={(playCount)}>
                <img src={`${coverImgUrl}?param=100y100`} alt="" />
              </div>
              <div className="playlist-header-bd">
                <h1>{name}</h1>
                <div className="playlist-header-user">
                  <img src={`${avatarUrl}?param=50y50`} alt="" />
                  <span>{nickname}</span>
                </div>
              </div>
            </div>
          </header>
        }
        
      </div>
    )
  }  
}
const mapStateToProps=state=>({
  
})
export default PlayList