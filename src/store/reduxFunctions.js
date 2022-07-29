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
    GET_STAGE_LIST, ON_ADD_USER, ON_CANCEL_PROCESS, ON_START_FAILED, ON_START_REQUEST,
    STAGE_EDIT_FAILURE,
    STAGE_EDIT_SUCCESS, START_SUCCESS
} from "./reducer";

export function createProcess(newProcess) {
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

export function deleteStage(id) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/deleteStage/${id}`, {
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
            dispatch(getStageList())
        } catch (e) {
            console.log(e)
        }
    }
}

export function addUser(name, processStarted) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/addUser?name=${name}&processStarted=${processStarted.processStarted}`)
            if (response.ok) {
                // const name = userInfor.name
                // const processStarted = userInfor.processStarted
                dispatch({type: ON_ADD_USER, userInfor: {name: name, processStarted: processStarted}});
                dispatch(initStartProcess(name, processStarted));
            }
        } catch(e) {
            console.log(e)
        }
    }
}

// export function initStartProcess(name) {
//     return async function sideEffect(dispatch) {
//         //sending data --> POST request
//         // send it within the params
//         // send it with the body
//         dispatch({type: ON_START_REQUEST})
//
//         try {
//             const response = await fetch("http://localhost:8080/startProcess", {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json', // willing to accept
//                     'Content-Type': 'application/json' //defining what we are sending
//                 },
//                 body: JSON.stringify(name)
//
//             })
//             const token = await response.json();
//             console.log('token: ' +token);
//             dispatch({type: START_SUCCESS, token: token, currentUser: name, startedProcess: true})
//         } catch (e) {
//             dispatch({type: ON_START_FAILED})
//         }
//     }
// }


//currently getting an 401 error on this. went a different route.
export function initStartProcess(name, processStarted) {
    return async function sideEffect(dispatch) {
        dispatch({type: ON_START_REQUEST})

        try {
            const response = await fetch(`http://localhost:8080/startProcess?name=${name}&processStarted=${processStarted.processStarted}`)
            if (response.ok) {
                const token = await response.json();
                console.log("this is a token: " + token)
                console.log("name :" + name )
                dispatch({type: START_SUCCESS, token, name});
            }
        } catch(e) {
            dispatch({type: ON_START_FAILED})
        }
    }
}


export function CompleteStep(stepToComplete, stepId) {

    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/completeStep/${stepId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin" : "*"
                },
                body: JSON.stringify(stepToComplete)
            })
            if (response.ok)
                console.log("update successful")
            else {
                console.log("update not successful")
            }
            dispatch(getStageList())

        } catch(e) {
            console.log(e)
        }
    }
}


export function initCancelProcess() {
    return async function sideEffect(dispatch) {
    dispatch({type: ON_CANCEL_PROCESS}) }
}
