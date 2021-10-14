import Header from "./components/Header";
import Tasks from './components/Tasks'
import { useState} from 'react'
import Task from "./components/Task";


function App() {
  const [tasks, setTasks] = useState([{
    text: "OMG",
    id:0,
    remider:false,
    day:"Thursday",
},{
    text: "OMG Lol",
    id:1,
    remider:false,
    day:"Friday",
},{
    text: "OMG BUG",
    id:2,
    remider:true,
    day:"Saturday",
},])

// delete task
const deleteTask = (id) => {
  // console.log("delete ", id)
  setTasks( tasks.filter((task) => task.id !== id))
}


  return (
    <div className="container">
      {/* <h1>Testing auto resolve</h1>
      <h2> Hello {name}</h2> */}
      <Header title="Room 1"/>
      { tasks.length > 0 ? <Tasks tasks = {tasks}  onDelete = {deleteTask} /> : "No Tasks to show"}
      
    </div>
  );
}

export default App;
