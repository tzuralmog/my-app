// import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className= 'task'  style = {{color : task.totalDevices ? "red": "green"}}>

            <h3> {task.name }</h3>
            <p>
                total devices = {task.totalDevices}
            </p>
        </div>
    )
}

export default Task
