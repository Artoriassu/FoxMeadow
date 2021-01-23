import { actions } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { postsDataType } from '../../../types/types';

type MapStatePropsType = {
    posts_Data: Array<postsDataType>
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
type OwnPropsType = {}
let mapStateToProps = (state: AppStateType) => {
    return {
        posts_Data: state.profilePage.posts_Data,
        newPostText: state.profilePage.newPostText,
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPost_actionCreator(newPostText));
        },
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;