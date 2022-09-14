import './styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ModalDashboard from '../ModalDashboard'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import usePay from '../../hooks/usePay';
import { Link } from 'react-router-dom'

function Header(props) {
    const [modalDash, setModalDash] = useState(false)
    const { userName, getUserName } = usePay()

    const getUserApi = async () => {
        try {
            const response = await api.get('/usuario');
            getUserName(response.data.nome)
        } catch (error) {
            throw error
        }
    }

    const titlePage = () => {
        if (props.page !== 'home') {
            return
        }
        return (
            <h1 className='title-header'>Resumo das Cobranças</h1>
        )
    }

    const pageMap = () => {
        if (props.page === 'home') {
            return
        }
        if (props.page === 'clients') {
            return (
                <Link to='/clients' className='clients-header'>Clientes</Link>
            )
        }
        if (props.page === 'charges') {
            return <Link to='/charges' className='clients-header'>Cobranças</Link >
        }

        if (props.page === 'details') {
            return (
                <> <Link to="/clients" className='clients-header'>Clientes</Link><span className='clients-header gray'>{'>'}</span><Link to="#" className='clients-header gray'>Detalhes do cliente</Link></>
            )
        }
    }

    useEffect(() => {
        getUserApi()
    }, [])

    return (
        <header className='header'>
            <div className='header-content'>
                <div className='title-map'>
                    {titlePage()}
                    {pageMap()}
                </div>

                <div className='user__data'
                    onClick={() => setModalDash(!modalDash)}>
                    <span className='name__first-letter'>{userName.firstsLetter}</span>
                    <p className='name__user'
                    >{userName.userName}</p>
                    <KeyboardArrowDownIcon
                        className='icon--arrow'
                    />
                </div>
                {modalDash && <ModalDashboard />}
            </div>
        </header>
    );
}

export default Header;
