// import {v4 as uuidv4} from 'uuid';

export const EDITOR = 'reducer/EDITOR';
export const FOLLOWER = 'reducer/EDITOR';
export const LOGIN = 'LOGIN';
export const ON_ADD_USER = 'ON_ADD_USER';
export const ON_HOME = 'ON_HOME';

export const GET_PROCESS_LIST = 'GET_PROCESS_LIST';
export const GET_STAGE_LIST = 'GET_STAGE_LIST';
export const TO_DO = 'TO_DO';
export const STEP = 'STEP';
export const ON_SELECTED_TODO = 'ON_SELECTED_TODO';
export const ON_SELECTED_STEP = 'ON_SELECTED_STEP';


export const SELECT_PROCESS_TO_EDIT = 'SELECT_PROCCESS_TO_EDIT';
export const SELECT_STAGE_TO_EDIT = 'SELECT_STAGE_TO_EDIT';
export const EDITING_PROCESS = "EDITING_PROCESS";
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';
export const STAGE_EDIT_SUCCESS = 'STAGE_EDIT_SUCCESS';
export const STAGE_EDIT_FAILURE = 'STAGE_EDIT_FAILURE';


export const EDITING_STAGE = 'EDITING_STAGE';
export const ON_START_REQUEST = 'ON_START_REQUEST';
export const START_SUCCESS = 'START_SUCCESS';
export const ON_START_FAILED = 'ON_START_FAILED';
export const ON_CANCEL_PROCESS = 'ON_CANCEL_PROCESS';

const initState = {

    isEditor: false,
    isFollower: false,
    role: 'home',

    token: null,
    currentUser: null,
    userList: [],
    startMessage: "your process has started... please stay focused and achieve your ultimate reality",

    startedProcess: false,
    startPending: false,
    startFailed: false,

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

    stageList: [],
    stageMessage: "",
    stageEditing: false,

    selectedStage: null,
    selectedStep: null,
    step: null,
    stepOption: null

}

export function reducer(state = initState, action) {
    switch (action?.type) {
        case ON_HOME:
            return {
                ...state,
                role: 'home',
                toDo: null,
                startedProcess: false,
                token: null
            }
        case LOGIN:
            return {
                ...state,
                role: action.role
            }
        // case EDITOR:
        //     return {
        //         ...state,
        //         isEditor: true,
        //         role: "editor"
        //     }
        // case FOLLOWER:
        //     return {
        //         ...state,
        //         isFollower: true,
        //         role: "follower"
        //     }
        case ON_ADD_USER:
            return {
                ...state,
                userList: [...state.userList, action.userInfor],
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
        case TO_DO:
            return {
                ...state,
                processToDo: true,
                toDo: action.toDo,
            }
        case STEP:
            return {
                ...state,
                stepToDo: true,
                selectedStage: action.selectedStage
            }
        case ON_SELECTED_TODO:
            return {
                ...state,
                toDoOption: action.select
            }
        case ON_SELECTED_STEP:
            return {
                ...state,
                stepOption: action.select
            }
        case SELECT_PROCESS_TO_EDIT:
            return {
                ...state,
                selectedToDo: action.select
            }
        case SELECT_STAGE_TO_EDIT:
            return {
                ...state,
                selectedStep: action.select
            }
        case EDITING_PROCESS:
            return {
                ...state,
                processEditing: true,
                selectedProcess: action.selectedProcess
            }
        case EDITING_STAGE:
            return {
                ...state,
                stageEditing: true,
                selectedStage: action.selectedStage
            }

        case EDIT_SUCCESS:
            return {
                ...state,
                processEditing: false,
                selectedProcess: null,
                editFailed: false
            }
        case STAGE_EDIT_SUCCESS:
            return {
                ...state,
                stageEditing: false,
                editFailed: false
            }
        case EDIT_FAILURE:
            return {
                ...state,
                processEditing: false,
                selectedProcess: null,
                editFailed: true
            }
        case STAGE_EDIT_FAILURE:
            return {
                ...state,
                stageEditing: false,
                selectedStage: null,
                editFailed: true
            }
        // case ON_START_PROCESS:
        //     return {
        //         ...state,
        //         startedProcess: true
        //     }

        case ON_START_REQUEST:
            // if you uncomment this, this bug will happen: it wont let you sign in right after you make a user.
            // but it will eliminate the error of signing in without a username in the db. --->
            // const foundUser = state.userList.find(user => user.username === action.loginInfo.username && user.password === action.loginInfo.password);
            //     if (!foundUser) {
            //         alert('invalid login')
            //         return {...state}
            //     }
            //         alert('valid login')
            return {
                ...state,
                startPending: true
            }
        case START_SUCCESS:
            return {
                ...state,
                token: action.token,
                currentUser: action.name,
                startPending: false,
                startFailed: false,
                startedProcess: true
            }
        case ON_START_FAILED:
            return {
                ...state,
                startPending: false,
                startFailed: true
            }
        case ON_CANCEL_PROCESS:
            return {
                ...state,
                token: null,
                toDo: null,
                startedProcess: false
            }
        default:
            return {...state}
    }
}