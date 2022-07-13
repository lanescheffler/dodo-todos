import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProcess, editProcess} from "../store/reduxFunctions";
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
        processMessage: state.processMessage,
        processEditing: state.processEditing,
        selectedProcess: state.selectedProcess,
        editFailed: state.editFailed,
    }))

    const newProcess = {
        title: '',

        // stageId: null,
        // stageList: [],

        toDO: true,
        started: false,

        finished: false
    }

    // const dropdown = useRef()

    const [formState, setFormState] = useState(newProcess)
    const [editState, setEditState] = useState(newProcess)

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
        }
    }

    function addProcess(e) {
        e.preventDefault()
        if (formState.title === "") {
            return
        }
        dispatch(createProcess({formState: formState, newProcess}))
        setFormState(newProcess)
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