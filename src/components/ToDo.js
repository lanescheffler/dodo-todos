import {useDispatch, useSelector} from "react-redux";
import {createStage, getProcessList} from "../store/reduxFunctions";
import {useEffect} from "react";
import {Button, Card} from "react-bootstrap";
import {useState} from "react";

export function ToDo() {

    const dispatch = useDispatch();
    // const processList = useSelector(state => state.processList)
    const toDo = useSelector(state => state.toDo)

    useEffect(() => {
        dispatch(getProcessList())
    }, [])

    let newStage = {
        promptu: 'promptu',
        stageId: new Date().getMilliseconds(),
        processId: toDo[0].title.toString(),

        orderNumber: null,
        pending: true,
        done: false,

        comments: 'please enter comments',

    }

    const [stageState, setStageState] = useState(newStage)

    return <>
        <div>
            <Card style={{backgroundColor: 'grey', color: 'white'}}
                  className={'d-flex w-80 p-3 m-auto'}
                  border={'black'}>

                    <span>
                        PROCESS: [{toDo[0].title}] || STATUS:
                    </span>
                <span>
                        IS FINISHED: {toDo[0].finished.toString()}
                    </span>
                {/*this will be where the multiple choice is for 'todo' or 'started' or 'done'*/}
                <div
                    style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 10}}>
                    <button onClick={(e) => {
                        dispatch(createStage({stageState: stageState, newStage}))
                        setStageState(newStage)
                    }}>ADD STEP
                    </button>
                </div>

            </Card>
        </div>
    </>
}

