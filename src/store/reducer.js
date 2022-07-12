export const ON_LOGIN_EDITOR = 'reducer/ON_LOGIN_EDITOR';
export const ON_LOGIN_FOLLOWER = 'reducer/ON_LOGIN_EDITOR';

const initState = {

    isEditor: false,
    isFollower: false,
    role: 'home',

    token: null,

    processList: [],
    stageList: [],

    selectedProcess: null,
    startedProcess: null

}

export function reducer(state = initState, action) {
    switch (action?.type) {
        case ON_LOGIN_EDITOR:
            return {
                ...state,
                isEditor: true,
                role: "editor"
            }
        case ON_LOGIN_FOLLOWER:
            return {
                ...state,
                isFollower: true,
                role: "follower"
            }
        default:
            return {...state}
    }
}