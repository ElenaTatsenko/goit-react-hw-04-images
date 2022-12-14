import React from "react"
import css from './Button.module.css';
import PropTypes from 'prop-types';


 const Button = ({onClick}) => {
    return <button className={css.Button}
            type='submit'
            onClick={onClick}
        > Load More </button>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Button;