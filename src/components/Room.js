

function Room({room, floor}) {
    console.log(floor)

    return (
        <div className = "roomBox" style = {{ top : "10%", left : "10%", height : "10%", width : "10%" }}>
            <p className = "roomBoxTitle"> {room.name }</p>
        </div>
    )
}

export default Room
