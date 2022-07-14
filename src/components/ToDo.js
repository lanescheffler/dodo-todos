import {useDispatch, useSelector} from "react-redux";
import {getProcessList} from "../store/reduxFunctions";
import {useEffect} from "react";
import {Button, Card} from "react-bootstrap";

export function ToDo({toDo}) {
    const dispatch = useDispatch();
    // const processList = useSelector(state => state.processList)

    useEffect(() => {
        dispatch(getProcessList())
    }, [])

    return <>
        <Card style={{backgroundColor: 'grey', color: 'white'}}
              className={'d-flex float-start w-25 p-2 m-1'}
              border={'secondary'}>

            <span className={'text-decoration-underline'}> Process TITLE: </span>
            {toDo[0].title}
            {toDo[0].finished}
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

