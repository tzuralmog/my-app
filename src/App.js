import Header from "./components/Header";
import Tasks from './components/Tasks'
import { useState, useEffect} from 'react'
import AddTask from "./components/AddTask";


function App() {

  const[showAddTask,setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([{
    text: "OMG",
    id:0,
    reminder:false,
    day:"Thursday",
},{
    text: "OMG Lol",
    id:1,
    reminder:false,
    day:"Friday",
},{
    text: "OMG BUG",
    id:2,
    reminder:false,
    day:"Saturday",
},])

useEffect( () => {
  const fetchTasks = async () => {
    const res = await fetch('https://apps.cloud.us.kontakt.io/v2/locations/buildings/36029',{
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
      },
    })
    const data = res.json()
    console.log(data)
    // console.log(JSON.stringify( data))
    return data
  }
  fetchTasks()
},[])

// add task
const addTask = (task) => {
  // setTasks( tasks.filter((task) => task.id !== id))
  const id = Math.floor (Math.random() * 1000) +1
  const newTask = {id , ...task}
  setTasks([...tasks,newTask])
}

// delete task
const deleteTask = (id) => {
  setTasks( tasks.filter((task) => task.id !== id))
}

//toggle
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? {...task , reminder: !task.reminder}: task))
}


  return (
    <div className="container">
      {/* <h1>Testing auto resolve</h1>
      <h2> Hello {name}</h2> */}
      <Header title="Room 1" onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      { tasks.length > 0 ? <Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder} /> : "No Tasks to show"}
      
    </div>
  );
}

export default App;
