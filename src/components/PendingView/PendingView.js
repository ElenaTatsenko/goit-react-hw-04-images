import css from '../index.module.css';
import { InfinitySpin } from 'react-loader-spinner';


 const PendingView = () => {
    return <div className={css.PendingView}><InfinitySpin /> <div>Enter search Value</div><InfinitySpin /> </div>
}

export default PendingView;