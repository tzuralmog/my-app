import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Rooms from "./components/Rooms";
import tests from "./components/tests";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [floorGeometry, setfloorGeometry] = useState([]);

  useEffect(() => {
    const getBasics = async () => {
      // const user = await fetchUser()

      const buildingList = await fetchBuildings();
      console.log(buildingList);
      const mainOffice = buildingList.content
        .filter((building) => building.name === "Main Office")
        .shift();
      const groundFloor = mainOffice.floors
        .filter((floor) => floor.name === "Ground Floor")
        .shift();

      const picGeo = groundFloor.imageXyGeojson.geometry.coordinates[0];

      var groundFloorXMin = picGeo[0][0],
        groundFloorXMax = picGeo[0][0],
        groundFlooryMin = picGeo[0][1],
        groundFlooryMax = picGeo[0][1];
      for (let index = 1; index < picGeo.length; index++) {
        const x = picGeo[index][0];
        const y = picGeo[index][1];
        if (x < groundFloorXMin) {
          groundFloorXMin = x;
        } else if (x > groundFloorXMax) {
          groundFloorXMax = x;
        }
        if (y < groundFlooryMin) {
          groundFlooryMin = y;
        } else if (y > groundFlooryMax) {
          groundFlooryMax = y;
        }
      }
      setfloorGeometry({
        groundFloorXMin,
        groundFloorXMax,
        groundFlooryMin,
        groundFlooryMax,
      });

      const roomsList = await fetchRooms(groundFloor.id);
      roomsList.content.forEach(setRoomBasics);
      setTasks(roomsList.content);

      getTotalDevices(roomsList.content, groundFloor.id);
    };
    getBasics();
  }, []);

  // set room basics
  function setRoomBasics(room) {
    room["totalDevices"] = 0;
    const geoPoints = room.xyGeojson.geometry.coordinates[0];
    var xMin = geoPoints[0][0],
      xMax = geoPoints[0][0],
      yMin = geoPoints[0][1],
      yMax = geoPoints[0][1];

    for (let index = 1; index < geoPoints.length; index++) {
      const x = geoPoints[index][0];
      const y = geoPoints[index][1];
      if (x < xMin) {
        xMin = x;
      } else if (x > xMax) {
        xMax = x;
      }
      if (y < yMin) {
        yMin = y;
      } else if (y > yMax) {
        yMax = y;
      }
    }
    room["xMin"] = xMin;
    room["xMax"] = xMax;
    room["yMin"] = yMin;
    room["yMax"] = yMax;
  }

  // get total devices
  const getTotalDevices = async (tasksX, groundFloorId) => {
    const positions = await fetchPositions(groundFloorId);
    var newTasks = tasksX.map((task) => {
      var devices = 0;
      for (let index = 0; index < positions.length; index++) {
        const pos = positions[index];

        const devi = pos.filter((position) => {
          return (
            position.x > task.xMin &&
            position.x < task.xMax &&
            position.y > task.yMin &&
            position.y < task.yMax
          );
        });
        devices += devi.length;
      }
      task.totalDevices = devices;
      return task;
    });
    setTasks(newTasks);
  };

  // fetch user
  const fetchUser = async () => {
    const res = await fetch(
      "https://apps.cloud.us.kontakt.io/v2/organization/account/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
        },
      }
    );
    const data = await res.json();
    return data;
  };

  // fetch building
  const fetchBuildings = async () => {
    const http = `https://apps.cloud.us.kontakt.io/v2/locations/buildings?
  page=0
  &size=50
  &sort=name`;
    const res = await fetch(http, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
      },
    });
    const data = await res.json();
    return data;
  };

  // fetch rooms
  const fetchRooms = async (floorId) => {
    const http = `https://apps.cloud.us.kontakt.io/v2/locations/rooms?
  page=0&
  size=10&
  sort=name
  &floorId=${floorId}`;
    const res = await fetch(http, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
      },
    });
    const data = await res.json();
    return data;
  };

  // fetch positions
  const fetchPositions = async (floorId) => {
    var page = 0;
    var http = `https://apps.cloud.us.kontakt.io/v2/positions/history?page=${page}&sort=timestamp&floorId=${floorId}`;
    // var http = `https://apps.cloud.us.kontakt.io/v2/positions?page=${page}&size=1000&sort=timestamp,desc&floorId=${floorId}&lost=false`
    // const httpT = `https://apps.cloud.us.kontakt.io/v2/positions/history?&sort=timestamp&floorId=${floorId}&startTime=2021-10-13T09:00:00Z&endTime=2021-05-18T10:00:00Z`
    var total = [];
    while (http !== undefined) {
      var res = await fetch(http, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
        },
        redirect: "follow",
      });
      var data = await res.json();
      console.log("data");
      console.log(data);
      total.push(data.content);
      if (
        data.links.filter((link) => {
          return link.rel === "next";
        }).length !== 0
      ) {
        page++;
        http = `https://apps.cloud.us.kontakt.io/v2/positions/history?page=${page}&sort=timestamp&floorId=${floorId}`;
        // http = `https://apps.cloud.us.kontakt.io/v2/positions?page=${page}&size=1000&sort=timestamp,desc&floorId=${floorId}&lost=false`
        console.log(http);
      } else {
        http = undefined;
      }
    }
    return total;
  };

  // fetch occupancy
  const fetchOccupancy = async (floorId) => {
    const http = `https://apps.cloud.us.kontakt.io/v3/presences?
  page=0
  &sort=endTime,desc
  &floorId=${floorId}`;
    const res = await fetch(http, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "ilcGMcUsxAQEUWGHZPHiCTCqVafdMfFx",
      },
    });
    const data = await res.json();
    return data;
  };

  // add task
  const addTask = (task) => {
    // setTasks( tasks.filter((task) => task.id !== id))
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      {/* <h1>Testing auto resolve</h1>
      <h2> Hello {name}</h2> */}
      <Header
        title="Ground Floor"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {/* <p>{floorGeometry ? "": floorGeometry.shift()}</p> */}
      {tasks.length > 0 ? (
        <Rooms rooms={tasks} floor={floorGeometry} />
      ) : (
        <div className="loader"></div>
      )}

      {/* {showAddTask && <AddTask onAdd = {addTask}/>}
      { tasks.length > 0 ? <Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder} /> : <p>No rooms to show</p> } */}
      {/* <canvas id="myCanvas" width="200" height="100"></canvas> */}
      {/* 
      Nonsense
      <script src="https://prod-useast-b.online.tableau.com/#/site/kontaktiomvp/javascripts/api/tableau-version.min.js"></script>
      <p className = "Ajax"></p> */}
      <script
        type="text/javascript"
        src="https://prod-useast-b.online.tableau.com/javascripts/api/viz_v1.js"
      >
        
      </script>
      {/* style="width: 1000px; height: 827px;" */}
      <div class="tableauPlaceholder" >
        {/* <object
          class="tableauViz"
          width="1000"
          height="827"
          style="display:none;"
        >
          <param
            name="host_url"
            value="https%3A%2F%2Fprod-useast-b.online.tableau.com%2F"
          />{" "}
          <param name="embed_code_version" value="3" />{" "}
          <param name="site_root" value="&#47;t&#47;kontaktiomvp" />
          <param
            name="name"
            value="Proofofconcept&#47;Dashboard1&#47;0d6d909e-5707-4cd8-9572-91ddfdbc24b6&#47;Testing"
          />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="showAppBanner" value="false" />
        </object> */}
      </div>
    </div>
  );
}

export default App;
