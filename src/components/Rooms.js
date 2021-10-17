import Room from './Room'


function Rooms({rooms}) {
    return (
        <div className = "pictureDiv">

            {/* <img src="FloorPlan.png" alt="Floor Plan" className ="floorPlan" ></img> */}

            { 
            rooms.map((room) => ( 
            <Room key = {room.id} room = {room}/> 
            )  )
            }
         

        </div>
        

    )
}

export default Rooms
