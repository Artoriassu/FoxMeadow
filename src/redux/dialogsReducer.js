const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'dialogs/UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let mesText = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 8,text: mesText}],
            }
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText,
            }
        }
        default:
            return state;
    }
}

export const addMessage_actionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody })
export const onMessageChange_actionCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })

export default dialogsReducer;