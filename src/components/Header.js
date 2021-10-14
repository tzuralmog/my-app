import PropTypes from 'prop-types'


const Header = ({title}) => {
    return (
        <header>
            <h1 >{title}</h1>
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
