import { InferActionsTypes } from './redux-store';

type DialogType = {
    id: number
    avatar: string
    person: string
}
type MessageType = {
    id: number
    text: string
}
let initialState = {
    dialogs: [
        { id: 1, avatar: 'http://avatarmaker.ru/img/11/1022/102144.gif', person: "Artemis" },
        { id: 2, avatar: 'http://avatarmaker.ru/img/11/1041/104096.gif', person: "Elfi" },
        { id: 3, avatar: 'http://avatarmaker.ru/img/9/895/89468.jpg', person: "Artas" },
        { id: 4, avatar: 'http://avatarmaker.ru/img/9/813/81229.jpg', person: "Illidan" },
        { id: 5, avatar: 'http://avatarmaker.ru/img/11/1021/102083.gif', person: "Rafael" },
    ] as Array<DialogType>,
    messages: [
        { id: 1, text: 'Hi!' },
        { id: 2, text: 'I have a present for you.' },
        { id: 3, text: 'Today it` so beatufil day...' },
    ] as Array<MessageType>,
};

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'dialogs/ADD-MESSAGE': {
            let mesText: string = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 8, text: mesText }],
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addMessage_actionCreator: (newMessageBody: string) => ({ type: 'dialogs/ADD-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>