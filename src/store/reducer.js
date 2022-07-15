export const ON_LOGIN_EDITOR = 'reducer/ON_LOGIN_EDITOR';
export const ON_LOGIN_FOLLOWER = 'reducer/ON_LOGIN_EDITOR';

export const GET_PROCESS_LIST = 'GET_PROCESS_LIST';
export const GET_STAGE_LIST = 'GET_STAGE_LIST';
export const ON_SELECTED_TODO = 'ON_SELECTED_TODO';
export const TO_DO = 'TO_DO';

export const SELECT_PROCESS_TO_EDIT = 'SELECT_PROCCESS_TO_EDIT';
export const EDITING_PROCESS = "EDITING_PROCESS";
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';

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
    processToDo: false,
    stageToDo: false,
    editFailed: false,

    selectedProcess: null,
    selectedToDo: null,
    toDo: null,
    toDoOption: null,

    startedProcess: false,

    stageList: [],
    stageMessage: "",
    // stageEditing: false,
    stageEditing: true,

    selectedStage: null,
    selectedStep: null,
    step: null,
    stepOption: null

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
        case GET_PROCESS_LIST:
            return {
                ...state,
                processList: action.processList
            }
        case GET_STAGE_LIST:
            return {
                ...state,
                stageList: action.stageList
            }
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
        case ON_SELECTED_TODO:
            return {
                ...state,
                toDoOption: action.select
            }
        case TO_DO:
            return {
                ...state,
                processToDo: true,
                toDo: action.toDo
            }

        case SELECT_PROCESS_TO_EDIT:
            return {
                ...state,
                selectedToDo: action.select
            }
        case EDITING_PROCESS:
            return {
                ...state,
                processEditing: true,
                selectedProcess: action.selectedProcess
            }
        case EDIT_SUCCESS:
            return {
                ...state,
                processEditing: false,
                selectedProcess: null,
                editFailed: false
            }
        case EDIT_FAILURE:
            return {
                ...state,
                processEditing: false,
                selectedProcess: null,
                editFailed: true
            }

        default:
            return {...state}
    }
}