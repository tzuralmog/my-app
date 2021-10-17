import Room from './Room'


function Rooms({rooms, floor}) {
    return (
        <div className = "pictureDiv">

            <img src="FloorPlan.png" alt="Floor Plan" className ="floorPlan" ></img>

            { 
            rooms.map((room) => ( 
            <Room key = {room.id} room = {room} floor = {floor}/> 
            )  )
            }
         

        </div>
        

    )
}

export default Rooms
