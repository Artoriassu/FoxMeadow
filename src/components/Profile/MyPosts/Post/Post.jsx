import React from 'react';
import view from './Post.module.css';

const Post = (props) => {
  return (
    <div className={view.item}>
      <img src='http://avatarmaker.ru/img/11/1044/104348.gif' />
      {props.message}
      <div>
        <span>like  : {props.counter}</span>
      </div>
    </div>
  )
}

export default Post;