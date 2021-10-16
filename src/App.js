import Header from "./components/Header";
import Tasks from './components/Tasks'
import { useState, useEffect} from 'react'
import AddTask from "./components/AddTask";


function App() {

  const[showAddTask,setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

// var companyId , mainOfficeID  , groundFloorId 

useEffect( () => {
  const getBasics = async () => {
    const user = await fetchUser()
    // console.log(JSON.stringify(tasksFromServer))
    // console.log(user)
    console.log( "companyId =" + user.company.companyId)

    const buildingList = await fetchBuildings()
    // console.log(buildingList)
    const mainOffice = buildingList.content.filter((building) => building.name === "Main Office").shift()
    console.log(mainOffice)
    const mainOfficeID = mainOffice.id
    console.log("mainOfficeID =" + mainOfficeID)
    const groundFloorId = mainOffice.floors.filter((floor) => floor.name === "Ground Floor").shift().id
    console.log( "groundFloorId =" + groundFloorId)

    const rooms = await fetchRooms(groundFloorId)
    console.log(rooms.content)
    setTasks(rooms.content)


    // position stuff I need TODO
    // const positions = await fetchPositions(groundFloorId)
    // console.log("positions")
    // console.log(positions)

    // const occupancy = await fetchOccupancy(groundFloorId)
    // console.log("occupancy")    
    // console.log(occupancy)

    
    
    
  }
  getBasics()
  
},[])

// fetch user
const fetchUser = async () => {
  const res = await fetch('https://apps.cloud.us.kontakt.io/v2/organization/account/me',{
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
    },
  })
  const data = await res.json()
  return data
}

// fetch building
const fetchBuildings = async () => {
  const http = `https://apps.cloud.us.kontakt.io/v2/locations/buildings?
  page=0
  &size=50
  &sort=name`
  const res = await fetch(http,{
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
    },
  })
  const data = await res.json()
  return data
}

// fetch rooms
const fetchRooms = async (floorId) => {
  const http = `https://apps.cloud.us.kontakt.io/v2/locations/rooms?
  page=0&
  size=10&
  sort=name
  &floorId=${floorId}`
  const res = await fetch(http,{
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
    },
  })
  const data = await res.json()
  return data
}

// fetch positions
const fetchPositions = async (floorId) => {
  const http = `https://apps.cloud.us.kontakt.io/v2/positions?
  page=0
  &size=20
  &sort=entityId
  &entityId=8698207486585742336
  &attributes%5Battr1%20name%5D=HHlxv&entityName=uRVBhiptsmRb
  &entityTypeId=2302181965356397568
  &entityTypeName=dvUNEEAnuYgu
  &floorId=3553380642136723456
  &buildingId=3352782155370725376
  &campusId=
  &trackingId=cxXImX
  &lost=false
  &type=EXdGv
  &campusId=`
  const httpT = `https://apps.cloud.us.kontakt.io/v2/positions?
  sort=lastUpdate,desc
  &floorId=${floorId}
  &entityId=
  &lost=false`
  const res = await fetch(httpT,{
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
    },
  })
  const data = await res.json()
  return data
}

// fetch occupancy
const fetchOccupancy = async (floorId) => {
  const http = `https://apps.cloud.us.kontakt.io/v3/presences?
  page=0
  &sort=endTime,desc
  &floorId=${floorId}`
  const res = await fetch(http,{
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Api-Key" : "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
    },
  })
  const data = await res.json()
  return data
}

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
      <Header title="Rooms" onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      <img src="FloorPlan.png" alt="Floor Plan" className ="floorPlan" ></img>
      {showAddTask && <AddTask onAdd = {addTask}/>}
      { tasks.length > 0 ? <Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder} /> : <p>No rooms to show</p> }
      {/* <canvas id="myCanvas" width="200" height="100"></canvas> */}
      
      
    </div>
  );
}

export default App;
