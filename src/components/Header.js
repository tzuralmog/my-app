import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    const onClick = ()=> {
        console.log("click")
    }
    return (
        <header className = 'header'>
            <h1 >{title}</h1>
            <Button color ='green' text = 'hello' onClick= {onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Default Room"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// css in javascript
// style = {headingStyle}
// const headingStyle = {
//     color: 'blue'
// }

export default Header
