import React from 'react';
import PropTypes from 'prop-types';

import './songlist.scss';

const CommonSongList=(props)=>{
  const {list,onItemClick}=props;
  return (
    <div className="song-wrapper">
      {
        list.length>0&&list.map((item,index)=>(
          <div className="song-item" onClick={()=>onItemClick(item.id,index)} key={item.id}>
            <div className="song-num">{index + 1}</div>
            <div className="song-info">
              <h2>{item.name}</h2>
              <p>
                <span>{item.singer}</span>&nbsp;-&nbsp;{item.album}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
CommonSongList.propTypes={
  list:PropTypes.any.isRequired,
  onItemClick: PropTypes.func.isRequired,

}
export default CommonSongList