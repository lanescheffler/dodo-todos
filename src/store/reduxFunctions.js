// import {
//
//     ON_LOGIN_EDITOR,
//     ON_LOGIN_FOLLOWER,
//     GET_PROCESS_LIST,
//     ON_PROCESS_ADD
//
// } from "./reducer"

import {EDIT_FAILURE, EDIT_SUCCESS, GET_PROCESS_LIST} from "./reducer";

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

export function getProcessList() {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch("http://localhost:8080/getProcessList")
            const data = await response.json();
            dispatch({type: GET_PROCESS_LIST, quizList: data})
        } catch (e) {
        }
    }

}

export function editProcess(newProcess, title) {

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
                body: JSON.stringify(newProcess)
            })
            console.log(await response)
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

export function deleteProcess(processToDo) {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch(`http://localhost:8080/deleteUser/${processToDo.title}`, {
                method: 'DELETE',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                // body: user
            })
            console.log(await response)
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
