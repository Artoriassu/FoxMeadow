import React from 'react';
import view from './Post.module.css';

type PropsType = {
  counter: number
  message: string
}
const Post:React.FC<PropsType> = (props) => {
  return (
    <div className={view.item}>
      <img src='http://avatarmaker.ru/img/11/1044/104348.gif' />
     <div className={view.itemMessage}> {props.message} </div>
      <div className={view.itemLike}>
        <span>like  : {props.counter}</span>
      </div>
    </div>
  )
}

export default Post;