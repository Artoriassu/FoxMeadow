import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

///Старый store

export let store =
{
    _state: {
        profilePage: {
            posts_Data: [
                { id: 1, counter: 0, message: 'Hi' },
                { id: 2, counter: 0, message: 'I`m here.' },
                { id: 3, counter: 0, message: 'Hey?' },
                { id: 4, counter: 0, message: 'Do you hear me?' },
                { id: 5, counter: 0, message: '...' },
                { id: 6, counter: 0, message: '...' },
                { id: 7, counter: 1, message: 'I`m waiting...' },
            ],
            newPostText: 'Save me',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, avatar: 'http://avatarmaker.ru/img/11/1022/102144.gif', person: "Artemis" },
                { id: 2, avatar: 'http://avatarmaker.ru/img/11/1041/104096.gif', person: "Elfi" },
                { id: 3, avatar: 'http://avatarmaker.ru/img/9/895/89468.jpg', person: "Artas" },
                { id: 4, avatar: 'http://avatarmaker.ru/img/9/813/81229.jpg', person: "Illidan" },
                { id: 5, avatar: 'http://avatarmaker.ru/img/11/1021/102083.gif', person: "Rafael" },
            ],
            messages: [
                { id: 1, text: 'Hi!' },
                { id: 2, text: 'I have a present for you.' },
                { id: 3, text: 'Today it` so beatufil day...' },
            ],
            newMessageText: 'Enter',
        },
        sidebar: {
            friends_sidebar: [
                { id: 'lord_rafael', avatar: 'http://avatarmaker.ru/img/11/1021/102083.gif', person: "Rafael" },
                { id: 'cold_king', avatar: 'http://avatarmaker.ru/img/9/895/89468.jpg', person: "Artas" },
                { id: 'warrior_illid', avatar: 'http://avatarmaker.ru/img/9/813/81229.jpg', person: "Illidan" },
                { id: 'brain_master', avatar: 'http://avatarmaker.ru/img/11/1022/102144.gif', person: "Artemis" },
                { id: 'fairy_shadow', avatar: 'http://avatarmaker.ru/img/11/1041/104096.gif', person: "Elfi" },
            ],
        }

    },
    _callSubscriber() {
        console.log("Changed");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        this._state.profilePage= profileReducer(this._state.profilePage, action);
        this._state.dialogsPage= dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar= sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
       
    },

}






export default store;
window.store = store;