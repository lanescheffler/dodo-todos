import {useEffect, useRef, useState} from "react";
import {createStage, deleteProcess, getProcessList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
// import {Button} from "react-bootstrap";
import {EDITING_PROCESS, ON_SELECTED_TODO, SELECT_PROCESS_TO_EDIT, TO_DO} from "../store/reducer";
import {ToDo} from "./ToDo";
import {Card} from "react-bootstrap";

// process = ToDo

export function ToDoList() {

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
    const selectedToDo = useSelector(state => state.selectedToDo)
    const toDoOption = useSelector(state => state.toDoOption)
    const toDo = useSelector(state => state.toDo)

    // const newStage = {
    //     promptu: 'Stage 1',
    //     stageId: new Date().getMilliseconds(),
    //     processId: toDo[0].title.toString(),
    //
    //     orderNumber: null,
    //     pending: true,
    //     done: false,
    //
    //     comments: 'please enter comments',
    //
    // }

    const [formState, setFormState] = useState("")
    // const [stageState, setStageState] = useState(newStage)

    if (selectedToDo) {
        dropdown.current.value = "default"
        dispatch({type: SELECT_PROCESS_TO_EDIT, select: false})
    }

    if (toDoOption) {
        dropdown.current.value = "default"
        dispatch({type: ON_SELECTED_TODO, select: false})
    }

    // if (toDo) {
    //     dropdown.current.value = "default"
    // }

    function handleForm(e) {
        e.preventDefault();
    }

    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
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
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else{
            dispatch(deleteProcess(formState))
            dropdown.current.value = "default"
        }
    }

    function selectProcess() {
        console.log(formState)
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const toDo = processList.filter(s => s.title === formState.processToDo)
            dispatch({type: TO_DO, toDo: toDo})
            dropdown.current.value = "default"
        }
    }

    if (!toDo) {
        return (
            <div>
                <div><font color="black"><h2>TODO List</h2></font></div>
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
                            editProcess()
                        }} className={'m-2'} size={'sm'}>
                            Edit
                        </button>
                    </span>
                        <span className={'ml-2'}>
                        <button onClick={(e) => {
                            dltProcess()
                        }} className={'m-2'} size={'sm'}>
                            Delete
                        </button>
                    </span>
                        <span className={'ml-2'}>
                        <button onClick={(e) => {
                            selectProcess()
                        }} className={'m-2'} size={'sm'}>
                            Select
                        </button>
                    </span>
                </form>

                {/*<div>*/}
                {/*    <Card style={{backgroundColor: 'grey', color: 'white'}}*/}
                {/*          className={'d-flex w-80 p-3 m-auto'}*/}
                {/*          border={'black'}>*/}

                {/*    <span>*/}
                {/*        PROCESS:*/}
                {/*        /!*Process: [{toDo[0].title}] || STATUS:*!/*/}
                {/*    </span>*/}
                {/*        <span>*/}
                {/*        IS FINISHED:*/}
                {/*            /!*IS FINISHED: {toDo[0].finished.toString()}*!/*/}
                {/*    </span>*/}
                {/*        /!*this will be where the multiple choice is for 'todo' or 'started' or 'done'*!/*/}

                {/*    </Card>*/}

                {/*</div>*/}
            </div>
        )
    }

    // pretty sure this doesnt need to be here - duplicate

    if (toDo) {
        return (<div>
            <div><font color="black"><h2>TODO List</h2></font></div>
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
                        editProcess()
                    }} className={'m-2'} size={'sm'}>
                        Edit
                    </button>
                </span>
                <span className={'ml-2'}>
                    <button onClick={(e) => {
                        dltProcess()
                    }} className={'m-2'} size={'sm'}>
                        Delete
                    </button>
                </span>
                <span className={'ml-2'}>
                    <button onClick={(e) => {
                        selectProcess()
                    }} className={'m-2'} size={'sm'}>
                        Select
                    </button>
                </span>
            </form>

            {/*<div>*/}
            {/*    <Card style={{backgroundColor: 'grey', color: 'white'}}*/}
            {/*          className={'d-flex w-80 p-3 m-auto'}*/}
            {/*          border={'black'}>*/}

            {/*        <span>*/}
            {/*            PROCESS: [{toDo[0].title}] || STATUS:*/}
            {/*        </span>*/}
            {/*        <span>*/}
            {/*            IS FINISHED: {toDo[0].finished.toString()}*/}
            {/*        </span>*/}
            {/*        /!*this will be where the multiple choice is for 'todo' or 'started' or 'done'*!/*/}
            {/*        <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 10}}>*/}
            {/*            <button onClick={(e) =>*/}
            {/*            {dispatch(createStage({stageState: stageState, newStage}))}}>ADD STAGE*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*    </Card>*/}

            {/*</div>*/}

        </div>)
    }
}