import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./Button";



type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
  }

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    //     мы получаем t.taskId снизу
    }
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    return <div>
        <h3> {props.title}
            <Button title={"X"} onClick={removeTodolistHandler}/>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button title={"+"} onClick={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}

        </div>
      
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={() => {'removeTask'}}>x</button>*/}
                        <Button title={"X"} onClick={() => {removeTaskHandler(t.taskId)}}/>
                        {/*передаём вверх t.taskId полученный с map вверх в функцию removeTaskHandler*/}
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={()=>{}}>All*/}
            {/*</button>*/}
            <Button title={"All"} onClick= {() => changeFilterHandler("all")}/>


            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={()=>{}}>Active*/}
            {/*</button>*/}
            <Button title={"Active"} onClick={() => changeFilterHandler("active")}/>

            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={()=>{}}>Completed*/}
            {/*</button>*/}
            <Button title={"Completed"} onClick={() => changeFilterHandler("completed")}/>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


