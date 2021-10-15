import PropTypes from 'prop-types'
// import Button from './Button'

const Header = ({title,onAdd, showAdd}) => {
    return (
        <header className = 'header'>
            <h1 >{title}</h1>
            {/* <Button color ={showAdd ? 'red': 'green'} text = {showAdd ? "Close Form" : "Add Tasks"} onClick= {onAdd}/> */}
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
