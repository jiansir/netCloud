import React from 'react';
import PropTypes from 'prop-types'
import { formatPlayCount} from 'common/util';
import './columnList.scss';

const ColumnList=(props)=>{
  const {list,onItemClick}=props;
  return (
    <div className="column-wrap">
      {
        list.length>0&&list.map(item=>{
          return (
            <div className="column-item" onClick={()=>onItemClick(item.id)} key={item.id}>
              <div className="column-img" data-play={formatPlayCount(item.playCount)}>
                <img src={item.picUrl} alt=""/>
              </div>
              <p className="column-title">{item.name}</p>
            </div>
          )
        })
      }
    </div>
  )
}
ColumnList.propTypes={
  list:PropTypes.array.isRequired,
  onItemClick:PropTypes.func.isRequired
}

export default ColumnList