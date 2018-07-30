import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'base/scroll/scroll';
import classNames from 'classnames';

import './musicList.scss';

const MusicList=(props)=>{
  const { list, show, music, onSelectItem}=props;
  return(
    
    <div className={classNames("musiclist",{active:show})}>
        <div className="musiclist-header">
          当前歌曲数（{list.length}）
        </div>
        <Scroll className="musiclist-scroll" options={{ bounce: false }}>
          {
            list.length > 0 && list.map((item, index) => (
              <div className={classNames('musiclist-item', { active: item.id === music.id })} key={item.id}>
              <h2 onClick={() => onSelectItem(item.id,index)}>
                  {item.name}
                  <small>&nbsp;-&nbsp;{item.singer}</small>
                </h2>
                <span className="musiclist-item-del"/>
              </div>
            ))
          }
        </Scroll>
      </div>
  )
}
MusicList.propTypes = {
  list: PropTypes.array.isRequired,
  music: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,

}

export default MusicList