import {useEffect, useRef, useState} from "react";
import {deleteProcess, getProcessList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
// import {Button} from "react-bootstrap";
import {EDITING_PROCESS, ON_SELECTED_TODO, SELECT_PROCESS_TO_EDIT, TO_DO} from "../store/reducer";
import {ToDo} from "./ToDo";

// process = ToDo

export function ToDoList() {

    const dispatch = useDispatch()
    const dropdown = useRef();
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getProcessList());
        }, 2000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const processList = useSelector(state => state.processList)
    const selectedToDo = useSelector(state =>state.selectedToDo)
    const toDoOption = useSelector(state => state.toDoOption)


    const [formState, setFormState] = useState("")

    if(selectedToDo){
        dropdown.current.value = "default"
        dispatch({type: SELECT_PROCESS_TO_EDIT, select: false})
    }

    if(toDoOption) {
        dropdown.current.value = "default"
        dispatch({type: ON_SELECTED_TODO, select: false})
    }

    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
    }

    function handleForm(e) {
        e.preventDefault();

    }

    function editProcess() {
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const selectedProcess = processList.filter(s => s.title === formState.processToDo)
            dispatch({type: EDITING_PROCESS, selectedProcess: selectedProcess})

        }
    }

    function dltProcess() {
        dispatch(deleteProcess(formState))
        dropdown.current.value = "default"
    }

    function selectProcess() {
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const toDo = processList.filter(s => s.title === formState.processToDo)
            dispatch({type: TO_DO, toDo: toDo})
            dispatch(handleForm)
        }
    }

    return (
        <>
            <div><font color="black"><h2>TODO List</h2></font></div>
            <form onSubmit={handleForm}>
                <select ref={dropdown}  onChange={onChangeProcess} >
                    <option value="default">Please select a TODO</option>
                    {processList.map((processToDo, idx) => {
                            return <option key={idx} value={processToDo.title}>
                                {processToDo.title}
                            </option>
                        }
                    )}}
                </select>
                <span className={'ml-2'}>
                    <button onClick={(e) => {editProcess()}} className={'m-2'} size={'sm'}>
                        Edit
                    </button>
                </span>
                <span className={'ml-2'}>
                    <button onClick={(e) => {dltProcess()}} className={'m-2'} size={'sm'}>
                        Delete
                    </button>
                </span>
                <span className={'ml-2'}>
                    <button onClick={(e) => {selectProcess()}} className={'m-2'} size={'sm'}>
                        Select
                    </button>
                </span>




                {/*<div><ToDo processToDo={processToDo}/></div>*/}
            </form>
        </>
    )
}