import {useEffect, useRef, useState} from "react";
import {deleteProcess, getProcessList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
// import {Button} from "react-bootstrap";
import {EDITING_PROCESS, SELECT_PROCESS_TO_EDIT} from "../store/reducer";

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
    const selectedToDo = useSelector(state=>state.selectedToDo)
    const processList = useSelector(state => state.processList)
    const [formState, setFormState] = useState("")

    if(selectedToDo){
        dropdown.current.value = "default"
        dispatch({type: SELECT_PROCESS_TO_EDIT, select: false})
    }
    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
    }

    function dltProcess() {
        dispatch(deleteProcess(formState))
        dropdown.current.value = "default"
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
                <span className={'ml-2'}><button onClick={(e) => {editProcess()}}
                                                 className={'m-2'}
                                                 size={'sm'}
                    // variant={'warning'}
                >Edit</button></span>
                <span className={'ml-2'}><button onClick={(e) => {dltProcess()}}
                                                 className={'m-2'}
                                                 size={'sm'}
                    // variant={'danger'}
                >Delete</button></span>
            </form>
        </>
    )
}