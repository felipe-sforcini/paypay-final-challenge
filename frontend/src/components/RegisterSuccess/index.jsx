import './styles.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom'

export default function Success(props) {

    const navigate = useNavigate('')

    return (
        <>
            <div className="success">
                <CheckCircleOutlineIcon sx={{ width: '104px', color: '#0E8750' }} />
                <h2>Cadastro registrado com sucesso</h2>

            </div>
            {props.status === 'Registrado' && <Button
                variant='contained'
                className='nav-login'
                disableElevation
                onClick={() => navigate('/login')}
            >
                Ir para login</Button>}

        </>
    )
}