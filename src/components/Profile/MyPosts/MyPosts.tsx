import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { postsDataType } from '../../../types/types';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import view from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength = maxLengthCreator(10);

type PropsType = {
    addPost: (newPostText: string) => void
    posts_Data: Array<postsDataType>
   // newPostText: string
}
const MyPosts:React.FC<PropsType> = React.memo(props => {
    
    let posts_Elements = props.posts_Data.map(post_info => <Post key={post_info.id} counter={post_info.counter} message={post_info.message} />)

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={view.Posts_Block}>
            <h2> My posts </h2>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={view.posts}>
                {posts_Elements}
            </div>

        </div>
    )
});

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name ='newPostText' component={Textarea} placeholder={'Post message'}
                validate={[required, maxLength ]}/>
            </div>
            <div>
                <button className={view.mesButton}>Add</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm)

export default MyPosts;