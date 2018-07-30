import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { map} from 'lodash';
import ColumnList from 'base/columnList/columnList';
import Scroll from 'base/scroll/scroll';
import {LS_Get} from 'common/util';
import { getUserSongList} from 'store/actions';

import './myMusic.scss';

class MyMusic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowList:true
    }
  }
  componentDidMount() {
    const uid = LS_Get('uid');
    this.props.onGetPlayList({uid})
  }
  playListDetail=(id)=>{
    this.props.history.push(`/playlist/${id}`)
  }
  toggleList=()=>{
    this.setState(prevState=>{
      return {
        isShowList: !prevState.isShowList
      }
    })
  }

  render() {
    const {playlist}=this.props;
    const { isShowList}=this.state;
    return (
      <div className="container">
        <Scroll options={{ bounce: false }}>
          <div className="create">
            <div className="create-title" onClick={this.toggleList}>我的歌单</div>
            {
              isShowList&&playlist.length>0 && playlist.map((item,index)=>(
                <MusicItem 
                  headImg={item.coverImgUrl}
                  name={item.name}
                  count={item.trackCount}
                  key={item.createTime}
                  onItemClick={this.playListDetail}
                  id={item.id}
                 />
              ))
            }
            
          </div>

        </Scroll>
      </div>
    )
  }
}
const MusicItem = ({ headImg, name, count, onItemClick,id})=>{
  
  return (
    <div className="songItem" onClick={()=>onItemClick(id)}>
      <img src={headImg} alt="" />
      <div className="song-info">
        <h2>{name}</h2>
        <div className="song-total">{count}首</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    playlist: state.getPlayListReducer.playlist
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetPlayList:data => getUserSongList(data, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusic)