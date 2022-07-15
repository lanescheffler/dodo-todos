import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProcess, createStage, editProcess} from "../store/reduxFunctions";
// import {v4 as uuidv4} from 'uuid';
import {Button, Card, Form} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {SELECT_PROCESS_TO_EDIT} from "../store/reducer";
// import {SELECT_DEFAULT} from "../Store/actions";

export function Process() {

    let {
        // token,
        processEditing,
        selectedProcess,
        editFailed,
    } = useSelector(state => ({
        // token: state.token,
        // processMessage: state.processMessage,
        processEditing: state.processEditing,
        selectedProcess: state.selectedProcess,
        editFailed: state.editFailed,
    }))

    const newProcess = {
        title: '',
        // stageTitle: 'Stage 1',
        //
        // stageId: stageId,
        // stageList: [],

        toDo: true,
        started: false,
        finished: false
    }

    const newStage = {
        promptu: 'Stage 1',
        stageId: new Date().getMilliseconds(),
        processId: newProcess.title.toString(),

        orderNumber: null,
        pending: true,
        done: false,

        comments: 'please enter comments',

    }

    // const dropdown = useRef()

    const [formState, setFormState] = useState(newProcess)
    const [editState, setEditState] = useState(newProcess)
    const [stageState, setStageState] = useState(newStage)
    const [editStageState, setEditStageState] = useState(newStage)

    const dispatch = useDispatch();

    // function updateSomething(e) {
    //     if (processEditing) {
    //         setEditState({
    //             ...editState,
    //             title: e.target.value
    //         })
    //     } else {
    //         setFormState({
    //             ...formState,
    //             title: e.target.value
    //         })
    //     }
    // }

    function updateTitle(e) {
        if (processEditing) {
            setEditState({
                ...editState,
                title: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                title: e.target.value
            })
            setStageState({
                ...stageState,
                processId: e.target.value
            })
        }
    }

    function addProcess(e) {
        e.preventDefault()
        if (formState.title === "") {
            return
        }
        dispatch(createProcess({formState: formState, newProcess}))
        dispatch(createStage({stageState: stageState, newStage}))
            //this will dispatch action to set stageId within process to processId within stage.
        setFormState(newProcess)
        setStageState(newStage)
    }

    function onEditSubmit(e) {
        e.preventDefault()
        if (editState.title === "") {
            return
        }
        dispatch(editProcess(editState, selectedProcess[0].title))
        setEditState(newProcess)
        dispatch({type: SELECT_PROCESS_TO_EDIT, select: true})
    }

    if (processEditing) {
        return <>
            <Card className={'w-80 text-left m-auto'}>
                <CardHeader style={{backgroundColor: "brown", color: 'black'}} className={'fs-3'}>
                    EDITING...
                </CardHeader>
                <Form className={'p-3'} onSubmit={onEditSubmit} style={{backgroundColor: 'grey'}}>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Title</Form.Label>

                        <input onChange={updateTitle} value={editState.title}
                               placeholder={selectedProcess[0].title} type='text'/>

                        <button type='submit'>Submit</button>
                    </Form.Group>
                </Form>

                <Card.Footer>
                    {/*<div><font color="black">please edit your todo...</font></div>*/}
                </Card.Footer>
            </Card>
        </>
    }
    return (
        <Card className={'w-80 text-left m-auto'}>
            <CardHeader style={{backgroundColor: "brown", color: 'black'}} className={'fs-3'}>
                CREAT A TODO
            </CardHeader>
            <Form className={'p-3'} onSubmit={addProcess} style={{backgroundColor: 'grey'}}>
                <Form.Group className={'mb-3'}>
                    <Form.Label>TITLE: </Form.Label>
                    <input onChange={updateTitle} value={formState.title} placeholder="title" type='text'/>
                    <button type='submit'>Submit</button>
                </Form.Group>
            </Form>

            <Card.Footer>
                {editFailed && <div><font color="black">ERROR: PLEASE TRY AGAIN</font></div>}
            </Card.Footer>

        </Card>)
}