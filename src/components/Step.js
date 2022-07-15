import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getStageList} from "../store/reduxFunctions";
import {Card, FormLabel} from "react-bootstrap";
import {useRef} from "react";

export function Step({stepData}) {

    console.log(stepData)

    let {stageEditing, selectedStage, editfailed,
    } = useSelector(state => ({
        stageEditing: state.stageEditing,
        selectedStage: state.selectedStage,
        editFailed: state.editFailed,
    }))

    const dispatch = useDispatch();
    const dropdown = useRef();
    const stageList = useSelector(state => state.stageList)



    useEffect(() => {
        dispatch(getStageList())
    }, [])

    if(stageEditing) {
     return(<>

         [please edit step]

         <Card style={{backgroundColor: 'grey', color: 'white'}}
               className={'d-flex float-start w-100 p-2 m-1'}
               border={'secondary'}>

            <span className={'stepText'}>

                <FormLabel classname={''}>
                  [{stepData.orderNumber}] | Edit Step Order:
                </FormLabel>

                <select ref={dropdown}>
                        <option value="default">123...</option>
                    {/*//need to write more code here for selecting order*/}
                    </select>


                <FormLabel classname={''}>
                    | Edit Prompt:  <input
                    // onChange={updateTitle}
                    //                        value={editState.title}
                                           placeholder={stepData.promptu}
                                           type={'text'}/> [{stepData.promptu}]
                </FormLabel>

                <FormLabel className={''}>
                    STATUS: is...
                    Pending: <input type={'checkbox'} className={'m-1'}/>
                </FormLabel>

                <FormLabel className={''}>
                 Done: <input type={'checkbox'} className={'m-1'}/>  |
                </FormLabel>

                <FormLabel classname={''}>
                    | comments:  <input type={'text'}/> [{stepData.comments}]
                </FormLabel>

                <span className={'ml-2'} style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    <button onClick={(e) => {
                        // on editStageSubmit()
                    }} className={'m-2'} size={'sm'}>
                        Submit
                    </button>
                </span>

            </span>

             <span> {stepData.pending}</span>
             <span> {stepData.done}</span>

             <div>
             </div>
         </Card>

     </>)
    }

    return <>

        <Card style={{backgroundColor: 'grey', color: 'white'}}
              className={'d-flex float-start w-100 p-2 m-1'}
              border={'secondary'}>

            <span className={'stepText'}>

                step #{stepData.orderNumber} : "{stepData.promptu}" is...

                <FormLabel className={''}>
                  Pending: <input type={'checkbox'} className={'m-1'}/>
                </FormLabel>

                <FormLabel className={''}>
                  Done: <input type={'checkbox'} className={'m-1'}/>  |
                </FormLabel>

                <FormLabel classname={''}>
                    {/*| comments:  <input type={'text'}/> [{stepData.comments}]*/}
                     | comments: [{stepData.comments}]
                </FormLabel>

                <span className={'ml-2'} style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 85}}>
                    <button onClick={(e) => {
                        // editProcess()
                        //editStage
                    }} className={'m-2'} size={'sm'}>
                        Edit
                    </button>
                </span>
                <span className={'ml-2'} style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    <button onClick={(e) => {
                        // dltProcess()
                        //dltStage
                    }} className={'m-2'} size={'sm'}>
                        Delete
                    </button>
                </span>

            </span>

            <span> {stepData.pending}</span>
            <span> {stepData.done}</span>

            <div>
            </div>
        </Card>

    </>

}