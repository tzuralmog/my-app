

function Room({room}) {


    return (
        <div className = "roomBox" style = {{ top : "8px" }}>
            <p className = "roomBoxTitle"> {room.name }</p>
        </div>
    )
}

export default Room
