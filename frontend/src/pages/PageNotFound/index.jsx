import { Button } from '@mui/material';
import notFound from '../../assets/notfound/pageNotFound.jpg'
import { useNavigate } from 'react-router-dom';
import './style.css'

function PageNotFound() {
    const navigate = useNavigate('')
    return (
        <div className="container-pageNotFound">
            <div className='box--pageNotFound'>
                <img className='img_notfound' src={notFound} alt='Pagina não encontrada' />
                <h1 className='title--notfound'>Ops! Não encontramos essa página!</h1>
                <Button
                    variant="contained"
                    className="btn-submit"
                    onClick={() => navigate('/')}
                >
                    Página Inicial
                </Button>
            </div>
        </div>
    );
}

export default PageNotFound;
