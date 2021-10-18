

function Room({room, floor}) {
    // console.log(floor)
    // {groundFloorXMin, groundFloorXMax, groundFlooryMin, groundFlooryMax}
    var topX,leftX,heightX,widthX
    // console.log("room")
    // console.log(room)
    // console.log("floor")
    // console.log(floor)
    topX = (1- (room.yMax- floor.groundFlooryMin)/(floor.groundFlooryMax- floor.groundFlooryMin))*100
    leftX = ((room.xMin- floor.groundFloorXMin)/(floor.groundFloorXMax- floor.groundFloorXMin))*100
    heightX = (room.yMax- room.yMin)/(floor.groundFlooryMax - floor.groundFlooryMin)*100
    widthX = ((room.xMax-room.xMin)/(floor.groundFloorXMax-floor.groundFloorXMin)) *100 
    // widthX = 10
    // heightX = 10
    // console.log(room.name + " " +leftX + " " +topX )
    // console.log(((room.xMax-room.xMin)/(floor.groundFloorXMax-floor.groundFloorXMin)))
    // console.log(room)
    // console.log(floor)
    const opaqueRed = "rgba(150, 1, 1, 0.37)", opaqueGreen = "rgba(1, 150, 33, 0.37)"
    return (
        <div className = "roomBox" 
        style = {{top : `${topX}%`, left: `${leftX}%`,  height:`${heightX}%`,  width: `${ widthX}%` , backgroundColor : room.totalDevices ? opaqueRed: opaqueGreen}}>
            {/* <div className = "roomBoxTitle" > */}
            <p className = "textOutline" > {room.name } <br />
            Total Devices = {room.totalDevices}</p>
            {/* <p className = "textOutline">Total Devices = {room.totalDevices}</p> */}
            {/* </div> */}
        </div>
    )
}
// css in javascript
// 
// const headingStyle = {
//     top : "10%", 
//     left : "10%", 
//     height : "10%", 
//     width : "10%"
// style = {{ maxWidth: `${room.name.length}vw`, maxHeight: `1vw` }}
// }
export default Room
