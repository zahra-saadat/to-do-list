import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css'

function MyTodo (){
    const inputRef = useRef(null)
    const [tasks , setTasks] = useState([])
    const [select , setSelect] = useState("")

    const handleSubmit = (f) => {
        f.preventDefault()
    }
    const handleClick = () => {
        const task = {priority: select, text:inputRef.current.value, done:false}
        setTasks([...tasks, task] ,
        localStorage.setItem("set_task", JSON.stringify(task)))
    }
    const handleSelect = (s) => {
        setSelect(s.target.value)
    }
    const handelCheck = (task) => {
        task.done = !task.done;
        setTasks([...tasks])
    }
    const handelDelete = (taskName) => {
        setTasks(tasks.filter((task) =>{return taskName !== task}))
    }
    
    return(
        <div className="container-fluid">
            <div className="h1 text-center text-bg-secondary p-3 full-width">To-Do List</div>
            <div className="row">
            <div className="col-sm-4 pt-3 ms-50 text-bg-light">
                <form onSubmit={handleSubmit}>
                    <p className="h3 mb-2 ps-1.5">My Task:</p>
                    <input className="container ms-1.5 mt-2.5" id="text" type="input" name="input" 
                    placeholder="Describe your task here" ref={inputRef}/>
                    <p className="h3 mt-3 mb-3 ps-1.5">Priority:</p>
                    <div className="container btn-group float-start">
                    <button className="btn text-bg-danger" 
                    type="button" value={"High"} onClick={handleSelect}>High</button>
                    <button className="btn btn-success" 
                    type="button" value={"Medium"} onClick={handleSelect}>Medium</button>
                    <button className="btn bg-warning text-white" 
                    type="button" value={"Low"} onClick={handleSelect}>Low</button>
                    </div>
                    <button className="btn btn-lg text-bg-secondary mt-4 float-end" type="button" 
                    onClick={handleClick}>+
                    </button>
                </form>
                </div>
                <div className="container col-sm-8 pt-3 text-bg-light">
                    <p className="h3">Task List:</p> 
                    <ul className="list-group list-group-flush text-bg-light">
                        <li className="list-group-item">
                        {tasks.map((task, index) => {
                        return(
                        <span key={index} 
                        className="list-group-item list-group-item-light" 
                        style={{textDecorationLine : task.done ? 'line-through' : 'none'}}>
                        {task.priority + ' : '} {task.text}
                        <div class="btn-group float-end">
                            <button className="btn btn-sm btn-success" type="button" 
                            onClick={()=>handelCheck(task)}>Done</button>
                            <button className="btn btn-sm btn-warning" type="button" 
                            onClick={()=>handelDelete(task)}>Del</button>
                        </div>
                        </span>)})
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )}
export default MyTodo