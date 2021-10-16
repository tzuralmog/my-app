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
    // console.log(mainOffice)
    const mainOfficeID = mainOffice.id
    console.log("mainOfficeID =" + mainOfficeID)
    const groundFloorId = mainOffice.floors.filter((floor) => floor.name === "Ground Floor").shift().id
    console.log( "groundFloorId =" + groundFloorId)

    const rooms = await fetchRooms(groundFloorId)
    // console.log(rooms.content)
    setTasks(rooms.content)

    const positions = await fetchPositions(groundFloorId)
    console.log("positions")
    console.log(positions)

    const occupancy = await fetchOccupancy(groundFloorId)
    console.log("occupancy")    
    console.log(occupancy)

    
    
    
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
      {showAddTask && <AddTask onAdd = {addTask}/>}
      { tasks.length > 0 ? <Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder} /> : <p>No rooms to show</p> }
      <img src="https://prod-0-apps-api.s3.amazonaws.com/file-store/floorplans/bd0884911c68/38002?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBzM9t14ZxDMWX%2FSu1%2B4LZI7MyxfymTndKuiNVYz6CcrAiEAhYXU6HbJhhkw1vWYx3SQc0C50vbJidepF9DrPWut3Dcq%2BAQIfBABGgwzNzYxMTY5MDU4OTIiDPzmVtQDmaJG4Df00SrVBDCXAI0MiPwZ0qmBGpq1DbbCpn8m%2FG5smRQlK5fXfYXJSrlxDTYvN%2BMtS5N1WKSnYsGKFPOQ31G%2Bqp1VLTNn6ou569kh8FNg9ldJPhsqywAT3XD%2BeVJr1Px%2BEmO3FWqtU1VjP6PG7rBkm5mpnJyDzHrxXy4BDkdD9b0oVSpbfVbWZPK%2FjGFJsM8XiAT%2FA9wStI3lq7CqOcYv%2FN5BY8MzzpVLGu624HlGSvE0H6I%2FcGfatshI%2F19ZLEuK0bpBQnuRg6CsY96nlELDSq56utfW7ykHkFaK8EEQNsd41uXC6FmudiOSgM%2BBMDjg3TDYmaArAoAZr9gz5CHEZGh8X6L8%2BWz1H97eiXBls4eXHSeuUf2ZvQNX%2Bjt2uAYauSfZrLp5MFf7gsH66xPl45msM2bsewOlkx4wz30QP%2FvluV5KnJwGc%2F%2FGBxlzfRqkcAi9eNWVRBIXikEaN1x8UJtHwZJW0UKUPYkJ2Eh2%2FQpR45RXYra8v1e414eGjW0lZZiB3HAtjlQlFpB1ThHMPcCXtyLb9wymWd1KM%2Ff5xWPIxsgc4LU4hz79DgeOfnTkiLSDyZAOrFcJZnDTt60Iu8F%2FYxVVBl1AjlsixVVHl%2BVFvAZCcaAfvCvYf3GgSihfcX6XyYMDpvri463nPxS46OQWiMlfl5cheNI8%2FAQtLX%2BH4JEsdstWPpCpKzf%2BB5eqb2nLbdqvVE4CR2HEmfPDnAYnirSwOXMyl50u%2F5bTWHWq%2FnoVVA2LIM5b7mLawpQfzTTVUSxm5N1v7Qaohb5eaoWIyE27ehI0b0TRETCixayLBjqaAawUf9gJSKbj8SoUs5VZbDr7O53FvYCP84%2B4huESHZwJW%2FLulB%2FXOMSXlOeSbJmNWjFbIXbmYsCDemp5%2B%2FWLsBCAk5RAbJaI64NgySAapfYkn9Tn%2BhhfF9B95Bsxs5%2FmGeOvm8x4Ml9EF1DvBosyjSsgCRaxChmcLa8rIgYmiVBxQGBKUObpxbbCsp4djeCRhi78zI8G4tDqa1k%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211016T190610Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=ASIAVPESQQ6SFPCA453B%2F20211016%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=71e9777c2b50f86315763cd7fc6271a40e169ec7410d3839b09799b0d5145454" alt="display image" />
    </div>
  );
}

export default App;
