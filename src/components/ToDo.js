import {useDispatch, useSelector} from "react-redux";
import {getProcessList} from "../store/reduxFunctions";
import {useEffect} from "react";
import {Button, Card} from "react-bootstrap";

export function ToDo({processToDo}) {
    const dispatch = useDispatch();
    // const processList = useSelector(state => state.processList)

    useEffect(() => {
        dispatch(getProcessList())
    }, [])

    return <>

        <Card style={{backgroundColor: '#E7DFC6', color: '#607744'}}
              className={'d-flex float-start w-25 p-2 m-1'}
              border={'secondary'}>

            <span className={'text-decoration-underline'}> Process TITLE: </span> {processToDo.title}


            <span> {processToDo.finished}</span>
            {/*this will be where the multiple choice is for 'todo' or 'started' or 'done'*/}

            <div>
            <span className={'ml-2'}>
                {/*<button className={'m-2'} size={'sm'} variant={'dark'} onClick={(e) => {addStage(e)}}>*/}
                {/*    ADD STAGE*/}
                {/*</button>*/}
            </span>
            </div>
        </Card>

    </>
}

