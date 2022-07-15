import {StepList} from "./StepList";
import {useDispatch, useSelector} from "react-redux";
import {TO_DO} from "../store/reducer";
import {useEffect, useRef, useState} from "react";
import {cancelProcess, getProcessList, startProcess} from "../store/reduxFunctions";

export function Stage() {

    const dispatch = useDispatch()
    const dropdown = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getProcessList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const processList = useSelector(state => state.processList)
    const currentProcess = useSelector(state => state.toDo)
    const filteredProcessList = processList.filter(td => td.todo = currentProcess)

    const [formState, setFormState] = useState("")

    function handleForm(e) {
        e.preventDefault();
    }

    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
    }

    function selectProcess() {
        console.log(formState)
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const toDo = processList.filter(s => s.title === formState.processToDo)
            dispatch({type: TO_DO, toDo: toDo})
            // dropdown.current.value = "default"
        }
    }

    if (!currentProcess) {
        return (
            <>
                <div><h2>please select a todo</h2></div>
                <div>
                    <form onSubmit={handleForm}>
                        <select ref={dropdown} onChange={onChangeProcess}>
                            <option value="default">Please select a TODO</option>
                            {processList.map((processToDo, idx) => {
                                    return <option key={idx} value={processToDo.title}>
                                        {processToDo.title}
                                    </option>
                                }
                            )}}
                        </select>

                        <span className={'ml-2'}>
                    <button onClick={(e) => {
                        selectProcess()
                    }} className={'m-2'} size={'sm'}>
                        Select
                    </button>
                </span>
                    </form>
                </div>
            </>
        )
    }
    if (currentProcess) {
        return (
            <>
                <div><h2>please select a todo</h2></div>
                <div>
                    <form onSubmit={handleForm}>
                        <select ref={dropdown} onChange={onChangeProcess}>
                            <option value="default">Please select a TODO</option>
                            {processList.map((processToDo, idx) => {
                                    return <option key={idx} value={processToDo.title}>
                                        {processToDo.title}
                                    </option>
                                }
                            )}}
                        </select>

                        <span className={'ml-2'}>
                    <button onClick={(e) => {
                        selectProcess()
                    }} className={'m-2'} size={'sm'}>
                        Select
                    </button>
                </span>

                        <span className={'ml-2'}>
                    <button onClick={(e) => {
                        startProcess()
                    }} className={'m-2'} size={'sm'}>
                        START
                    </button>
                </span>

                        <span className={'ml-2'}>
                    <button onClick={(e) => {
                        cancelProcess()
                    }} className={'m-2'} size={'sm'}>
                        CANCEL
                    </button>
                </span>
                    </form>
                </div>

                <StepList/>
            </>
        )
    }
}