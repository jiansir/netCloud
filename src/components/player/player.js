import React from 'react'
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classname';
import { setCurrentIndex, setCurrentMusic} from 'store/actions';
import { formatTime} from 'common/util';
import Cd from './cd/cd';
import MusicList from './musicList/musicList';
import Mask from 'base/mask/mask';
import { getMusicLrc } from 'store/actions';
import formatLyric from 'model/lyric';

import './player.scss';

class Player extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isFull:true,
      isPlay:false,
      showMusicList:false,
      currentTime:0,
      currentAllTime:0,
      currentMusic:{},
      isShowLrc:true,
      currentLrcIndex:-1
    }
  }
  componentDidMount(){
    console.log(this.props.currentMusic);
    this.audioEle=this.refs.myAudio;  
    this.bindEvents();
    this.getLyric(this.props.currentMusic.id)
  }
  bindEvents(){
    this.audioEle.addEventListener('ended',this.playNext)
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.currentMusic.id != this.props.currentMusic.id){
      this.getLyric(nextProps.currentMusic.id)
    }
  }

  //根据播放模式播放下一首
  playNext=()=>{
    this.nextMusic()
  }
  getLyric(id){
    var that=this;
    getMusicLrc(id).then(res=>{
      if(res.data.code==200){
        that.setState({
          lyrics: formatLyric(res.data.lrc.lyric)
        })
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  controlAudio(type,value,event){
    const myAudio = this.refs.myAudio;
    switch(type){
      case 'startPlay':
        myAudio.play();
        this.setState({
          isPlay:true,
          currentAllTime: myAudio.duration
        })
        break
      case 'pause':
        myAudio.pause();
        this.setState({
          isPlay: false
        })
        event.stopPropagation()
        break
      case 'play':
        myAudio.play();
        this.setState({
          isPlay: true
        })
        event.stopPropagation()
        break
      case 'getCurrentTime':
        this.setState({
          currentTime: myAudio.currentTime
        })
        this.changeLrcTop();
        this.getPrecent()
        break;
      case 'changeTime':
        this.setState({
          currentTime: event.target.value
        })
        myAudio.currentTime = event.target.value;
        this.getPrecent()
        break;
    }
  }
  getPrecent=()=>{
    var precent= Math.floor(this.state.currentTime / this.state.currentAllTime * 100)||0;
    this.setState({
      precent
    })
  }
  prevMusic=()=>{
    var  index=this.props.currentIndex-1;
    if (index < 0) {
      index = this.props.playList.length-1
    }
    this.props.onSetCurrentIndex(index)
    this.props.onSetCurrentMusic(this.props.playList[index])
  }
  nextMusic=()=>{
    var index = this.props.currentIndex + 1;
    if (index > this.props.playList.length) {
      index = 0
    }
    this.props.onSetCurrentIndex(index)
    this.props.onSetCurrentMusic(this.props.playList[index])
  }
  toggleList = (e,showMusicList)=>{
    this.setState({showMusicList:!this.state.showMusicList});
    e.stopPropagation();
  }
  selectMusic=(id,index)=>{
    if(id!=this.props.currentMusic){
      this.props.onSetCurrentIndex(index);
      this.props.onSetCurrentMusic(this.props.playList[index])
    }
  }
  togglePanel=()=>{
    this.setState((prevState)=>{
      return {
        isShowLrc: !prevState.isShowLrc
      }
    })
  }
  changeLrcTop=()=>{
    var { currentTime, lyrics} = this.state;
    var currentLrcIndex=0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime>lyrics[i][0]-1){
        currentLrcIndex=i
      }
    }
    this.setState({
      currentLrcIndex
    })
  }

  render(){
    const { isPlay, isFull, showMusicList, currentTime, precent, isShowLrc, lyrics, currentLrcIndex}=this.state;
    const { currentMusic, playList} =this.props;
    const precentCss={
      backgroundSize: `${precent+'%'} 100%`
    }
    return (
      <div className="player">
        <CSSTransition
          in={isFull}
          classNames="player-full"
          timeout={500}
          >
          <div className="player-full" style={{ display: isFull ? 'block' : 'none' }}>
            <div className="player-bg" style={{ backgroundImage: `url(${currentMusic.image})` }}>
            </div>
            <div className="header">
              <span className="header-back" onClick={() => {
                this.setState({ isFull: false })
              }}> </span>
              <h1>{currentMusic.name}</h1>
              <h2>{currentMusic.singer}</h2>
            </div>
            <div className="middle">
              
              {isShowLrc ? lyrics && <MusicLrc lyrics={lyrics} currentTime={currentTime} currentLrcIndex={currentLrcIndex} onToggle={this.togglePanel}/>:
                <div className="middle-cd">
                  <Cd isPlay={isPlay} image={currentMusic.image} onToggle={this.togglePanel} />
                  <div className="music-handle">
                      <div className="mh-item like"></div>
                      <div className="mh-item download"></div>
                      <div className="mh-item comment"></div>
                      <div className="mh-item setting"></div>
                  </div>
                </div>
                
              }
            </div>
            
            <div className="footer">
              <div className="progress-wrapper">
                <span className="progress-time progress-time-l">{formatTime(currentTime)}</span>
                <div className="progress-main">
                  <input type="range" ref="range" className="progress-range" step="0.01" max={currentMusic.duration} value={currentTime} onChange={(e) => this.controlAudio('changeTime', '', e)} style={precentCss}/>
                </div>
                <span className="progress-time progress-time-r">{formatTime(currentMusic.duration)}</span>
              </div>
              <div className="btn-wrapper">
                <div className="btn btn-mode mode-list" />
                <div className="btn btn-prev" onClick={this.prevMusic} />
                <div className={`btn btn-play ${!isPlay && 'btn-pause'}`} onClick={(e) => this.controlAudio(isPlay ? 'pause' : 'play', '', e)} />
                <div className="btn btn-next" onClick={this.nextMusic} />
                <div className="btn btn-list" onClick={(e) => this.toggleList(e)} />
              </div>
            </div>
          </div>  
        </CSSTransition>
        
        <div className="player-min" onClick={() => this.setState({isFull:true})}>
          <div className="player-min-img">
            <img src={currentMusic.image} alt="" width="100%" height="100%" />
          </div>
          <div className="player-min-info">
            <h2>{currentMusic.name}</h2>
            <p>{currentMusic.singer}</p>
          </div>
          <div className={`player-min-play ${!isPlay&&'pause'}`} onClick={(e) => this.controlAudio(isPlay?'pause':'play','',e)}></div>
          <div className="player-min-list" onClick={(e)=>this.toggleList(e)}></div>
        </div>
        <audio ref="myAudio" src={`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`} preload='true' onCanPlay={() => this.controlAudio('startPlay')} onTimeUpdate={(e)=>this.controlAudio('getCurrentTime')}></audio>
        <MusicList list={playList} music={currentMusic} show={showMusicList} onSelectItem={this.selectMusic} />
        {showMusicList && <Mask show={showMusicList} onMaskClick={this.toggleList} />}
        
      </div>
    )
  }
}
const MusicLrc=(props)=>{
  const { currentTime, lyrics, currentLrcIndex, onToggle}=props;
  return (
    <div className="lrc" onClick={onToggle}>
        <div className="lrc-scroll" style={{top:(100-(currentLrcIndex)*28)+'px'}}>
          {
            lyrics.map((item, index) => (
              <div className={classNames("lrc-text", { current: currentLrcIndex == index })} key={index}>
                {item[1]}
              </div>
            ))
          }
        </div>
      </div>
  )
}

const mapStateToProps=state=>{
  return {
    showPlayer: state.setPlayReducer.showPlayer,
    currentIndex: state.setPlayReducer.currentIndex,
    playList:state.setPlayReducer.playList,
    currentMusic: state.setPlayReducer.currentMusic
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    onSetCurrentIndex:data=>{
      dispatch(setCurrentIndex(data))
    },
    onSetCurrentMusic: data => {
      dispatch(setCurrentMusic(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)