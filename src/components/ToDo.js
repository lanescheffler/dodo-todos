import {useDispatch, useSelector} from "react-redux";
import {TODO_EDITING} from "../Store/actions";
import {deletingProcess, getQuizProcess} from "../Store/reduxFunctions";
import {useEffect} from "react";
import {Button, Card} from "react-bootstrap";

export function ToDo({processInfo}) {
    const dispatch = useDispatch();
    const quizList = useSelector(state => state.quiz.quizList)

    useEffect(() => {
        dispatch(getQuizList())
    }, [])

    function editQuiz(e) {
        const selectedQuiz = quizList.filter(s => s.quizQuestion === quizData.quizQuestion && s.applicant === quizData.applicant)
        dispatch({type: QUIZ_EDITING, selectedQuiz: selectedQuiz})

    }

    function deleteQuiz(e) {
        const selectedQuiz = quizList.filter(s => s.id === quizData.id)
        dispatch(deletingQuiz(selectedQuiz[0].id))
    }

    return <>

        <Card style={{backgroundColor: '#E7DFC6', color: '#607744'}}
              className={'d-flex float-start w-25 p-2 m-1'}
              border={'secondary'}>

            <span className={'text-decoration-underline'}>Quiz for: </span>{quizData.applicant}
            <span className={'text-decoration-underline'}> Quiz Question: </span> {quizData.quizQuestion}
            <span className={'text-decoration-underline'}> Quiz Answer: </span> {quizData.quizAnswer}
            {/*might have to change this - its reading as function*/}
            <span className={'text-decoration-underline'}> Quiz Grade: </span>{quizData.grade}
            <span> {quizData.finished}</span>
            {/*not sure this needs to be here*/}
            <div>
            <span className={'ml-2'}><Button className={'m-2'} size={'sm'} variant={'dark'}
                                             onClick={(e) => {editQuiz(e)}}>Edit</Button></span>

                <span className={'ml-2'}><Button className={'m-2'} size={'sm'} variant={'secondary'}
                                                 onClick={(e) => {deleteQuiz(e)}}>Delete</Button></span>
            </div>
        </Card>

    </>
}

