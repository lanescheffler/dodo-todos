// import {
//
//     ON_LOGIN_EDITOR,
//     ON_LOGIN_FOLLOWER,
//     GET_PROCESS_LIST,
//     ON_PROCESS_ADD
//
// } from "./reducer"

import {
    EDIT_FAILURE,
    EDIT_SUCCESS,
    GET_PROCESS_LIST,
    GET_STAGE_LIST, ON_ADD_USER,
    STAGE_EDIT_FAILURE,
    STAGE_EDIT_SUCCESS
} from "./reducer";

export function createProcess(newProcess) {
    console.log(newProcess.formState)
    return async function sideEffect() {
        try {
            await fetch("http://localhost:8080/createProcess", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(newProcess.formState)
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function createStage(newStage) {
    console.log(newStage.stageState)
    console.log(newStage)
    //getting 401 error on second submit because the information ie processId needs to change/be updated
    return async function sideEffect() {
        try {
            await fetch("http://localhost:8080/createStage", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(newStage.stageState)
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getProcessList() {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch("http://localhost:8080/getProcessList")
            const data = await response.json();
            dispatch({type: GET_PROCESS_LIST, processList: data})
        } catch (e) {
            console.log(e)
        }
    }

}

export function getStageList() {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch("http://localhost:8080/getStageList")
            const data = await response.json();
            dispatch({type: GET_STAGE_LIST, stageList: data})
        } catch (e) {
            console.log(e)
        }
    }

}

export function editProcess(processToDo, title) {

    // new object
    // the username for the user to update
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/editProcess/${title}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"


                },
                body: JSON.stringify(processToDo)
            })
            if (response.ok) {
                dispatch({type: EDIT_SUCCESS})
            } else {
                dispatch({type: EDIT_FAILURE})
                setTimeout(() => {
                    dispatch({type: EDIT_SUCCESS})
                }, 3000)
            }
            dispatch(getProcessList())
        } catch (e) {
            console.log(e)
        }
    }
}

export function editStage(stepToDo, id) {

    // new object
    // the username for the user to update
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/editStage/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"


                },
                body: JSON.stringify(stepToDo)
            })
            if (response.ok) {
                dispatch({type: STAGE_EDIT_SUCCESS})
            } else {
                dispatch({type: STAGE_EDIT_FAILURE})
                setTimeout(() => {
                    dispatch({type: STAGE_EDIT_SUCCESS})
                }, 3000)
            }
            dispatch(getStageList())
        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteProcess(process) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/deleteProcess/${process.processToDo}`, {
                method: 'DELETE',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
            if (response.ok)
                console.log("delete successful")
            else {
                console.log("delete not successful")
            }
            dispatch(getProcessList())
        } catch (e) {
            console.log(e)
        }
    }
}

export function addUser(userInfor) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/addUser?name=${userInfor.name}&processStarted=${userInfor.processStarted}`)
            if (response.ok) {
                const name = userInfor.name
                const processStarted = userInfor.processStarted
                dispatch({type: ON_ADD_USER, userInfor: {name: name, processStarted: processStarted}});
            }
        } catch(e) {
            console.log(e)
        }
    }
}




export function initCancelProcess() {

}
