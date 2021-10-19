

function Room({room, floor}) {

    var topX,leftX,heightX,widthX
    topX = (1- (room.yMax- floor.groundFlooryMin)/(floor.groundFlooryMax- floor.groundFlooryMin))*100
    leftX = ((room.xMin- floor.groundFloorXMin)/(floor.groundFloorXMax- floor.groundFloorXMin))*100
    heightX = (room.yMax- room.yMin)/(floor.groundFlooryMax - floor.groundFlooryMin)*100
    widthX = ((room.xMax-room.xMin)/(floor.groundFloorXMax-floor.groundFloorXMin)) *100 
    const opaqueRed = "rgba(150, 1, 1, 0.37)", opaqueGreen = "rgba(1, 150, 33, 0.37)"
    return (
        <div className = "roomBox" 
        style = {{top : `${topX}%`, left: `${leftX}%`,  height:`${heightX}%`,  width: `${ widthX}%` , backgroundColor : room.totalDevices ? opaqueRed: opaqueGreen}}>
            <p className = "textOutline" > {room.name } <br />
            Total Devices = {room.totalDevices}</p>

        </div>
    )
}

export default Room
