import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import view from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength = maxLengthCreator(10);

const MyPosts = React.memo(props => {
    
    let posts_Elements = props.posts_Data.map(post_info => <Post counter={post_info.counter} message={post_info.message} />)

    let onAddPost = (values) => {
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

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name ='newPostText' component={Textarea} placeholder={'Post message'}
                validate={[required, maxLength ]}/>
            </div>
            <div>
                <button >Add</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm)

export default MyPosts;