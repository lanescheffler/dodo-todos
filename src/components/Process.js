import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProcess} from "../store/reduxFunctions";
import {Button, Card, Form} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
// import {SELECT_DEFAULT} from "../Store/actions";

export function Process() {

    let {
        // token,
        processEditing,
        selectedProcess,
    } = useSelector(state => ({
        // token: state.token,
        processMessage: state.processMessage,
        processEditing: state.processEditing,
        selectedProcess: state.selectedProcess,
    }))

    const newProcess = {
        title: '',

        stageId: null,
        stageList: [],

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
    }

    function onEditSubmit(e) {
        e.preventDefault()
        if (editState.title === "") {
            return
        }
        // dispatch(editProcess(editState, selectedProcess[0].title))
        // setEditState(newProcess)
        // dispatch({type: SELECT_DEFAULT, select: true})
    }

    if (processEditing) {
        return <>
            <Card className={'w-80 text-center m-auto'}>
                <CardHeader style={{backgroundColor: "white", color: 'black'}} className={'fs-3'}>Edit
                    Process</CardHeader>
                <Form className={'p-3'} onSubmit={onEditSubmit} style={{backgroundColor: 'lightcyan'}}>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Title</Form.Label>

                        <input onChange={updateTitle} value={editState.title}
                               placeholder={selectedProcess[0].title} type='text'/>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Card>
        </>
    }
    return (
        <Card className={'w-80 text-left m-auto'}>
            <CardHeader style={{backgroundColor: "brown", color: 'black'}} className={'fs-2'}>
                CREAT A PROCESS
            </CardHeader>
            <Form className={'p-3'} onSubmit={addProcess} style={{backgroundColor: 'grey'}}>
                <Form.Group className={'mb-3'}>
                    <Form.Label>TITLE: </Form.Label>
                    <input onChange={updateTitle} value={formState.title} placeholder="title" type='text'/>
                    <button type='submit'>Submit</button>
                </Form.Group>

            </Form>
            <Card.Footer>
                    <div><font color="black">THIS IS A FOOTER</font></div>
            </Card.Footer>

        </Card>)
}