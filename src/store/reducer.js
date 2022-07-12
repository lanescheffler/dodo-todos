export const ON_LOGIN_EDITOR = 'reducer/ON_LOGIN_EDITOR';
export const ON_LOGIN_FOLLOWER = 'reducer/ON_LOGIN_EDITOR';

const initState = {

    isEditor: false,
    isFollower: false,
    // role: null,
    // role: 'home',
    role: 'editor',
    // role: 'follower',

    token: null,

    processList: [],
    processMessage: "",
    processEditing: false,

    selectedProcess: null,
    startedProcess: false,

    stageList: [],
    stageMessage: "",
    stageEditing: false,

    selectedStage: null

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
        // case GET_PROCESS_LIST:
        //     return {
        //         ...state,
        //         processList: action.processList
        //     }
        // case ON_PROCESS_ADD:
        //     if (action.processInfo.title === '') {
        //         alert('please enter a title...')
        //         return {...state}
        //     }
        //     return {
        //         ...state,
        //         processList:
        //             [...state.processList, action.processInfo],
        //     }
        default:
            return {...state}
    }
}