let initialState = {
    friends_sidebar: [
        { id: 'lord_rafael', avatar: 'http://avatarmaker.ru/img/11/1021/102083.gif', person: "Rafael" },
        { id: 'cold_king', avatar: 'http://avatarmaker.ru/img/9/895/89468.jpg', person: "Artas" },
        { id: 'warrior_illid', avatar: 'http://avatarmaker.ru/img/9/813/81229.jpg', person: "Illidan" },
        { id: 'brain_master', avatar: 'http://avatarmaker.ru/img/11/1022/102144.gif', person: "Artemis" },
        { id: 'fairy_shadow', avatar: 'http://avatarmaker.ru/img/11/1041/104096.gif', person: "Elfi" },
    ],
};
type initialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any): initialStateType => {

    return state;
}

export default sidebarReducer;