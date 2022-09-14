import './styles.css'
import exit from '../../assets/modal/exit.svg'
import { clear } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
import ModalUser from '../ModalUser'

export default function ModalDashboard() {
    const navigate = useNavigate('')

    const handleLogout = () => {
        clear()
        navigate('/')
    }

    return (
        <div className='div-modal-dashboard'>
            <div className='arrow'></div>
            <div className='edit-user-div'>
                <ModalUser />

            </div>
            <div
                className='logout-div'
                onClick={() => handleLogout()}>
                <img src={exit} className='logout' alt='Sair' />
                <p className='logout-text'>Sair</p>
            </div>
        </div>
    )
}