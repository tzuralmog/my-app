

function Room({room}) {
    const geoPoints = room.xyGeojson.geometry.coordinates[0]
    var xMin = geoPoints[0][0], xMax = geoPoints[2][0], yMin = geoPoints[0][1], yMax = geoPoints[2][1]
    console.log( room.name + " Coordinates " + " XMin = " + xMin  +" xMax = " + xMax  +" yMin = " + yMin  +" yMax = " + yMax  )

    return (
        <div className = "roomBox" style = {{ top : "8px" }}>
            <p className = "roomBoxTitle"> {room.name }</p>
        </div>
    )
}

export default Room
