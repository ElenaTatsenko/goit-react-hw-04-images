import css from './ErrorView.module.css';
import PropTypes from 'prop-types';



const ErrorView = ( {errorName} ) => {
    return <h1 className={css.ErrorView}>{ Object.values(errorName)}</h1>
}

ErrorView.propTypes = {
    errorName: PropTypes.string.isRequired,
}
export default ErrorView;