// import {
//
//     ON_LOGIN_EDITOR,
//     ON_LOGIN_FOLLOWER,
//     GET_PROCESS_LIST,
//     ON_PROCESS_ADD
//
// } from "./reducer"

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
        } catch (e) {console.log(e)}
    }
}