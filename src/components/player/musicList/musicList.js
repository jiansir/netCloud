import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'base/scroll/scroll';
import classNames from 'classnames';

import './musicList.scss';

const MusicList=(props)=>{
  const { list, show, music, onSelectItem}=props;
  console.log(list.length);
  return(
    show&&
      <div className="musiclist">
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
  list: PropTypes.object.isRequired,
  music:PropTypes.object.isRequiresd,
  onItemClick: PropTypes.func.isRequired,

}

export default MusicList