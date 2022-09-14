import Sidebar from '../../components/Sidebar';
import CardClients from '../../components/CardClientsCharges'
import UsersIcon from '../../assets/sidebar/UsersIcon';
import filter from '../../assets/filter.svg'
import './styles.css';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModalClient from '../../components/ModalClients'
import usePay from '../../hooks/usePay'
import { useEffect } from 'react'
function HomeClients() {

    const { getClientsApi, setNotFoundFilter } = usePay()

    const handleFilterClients = async (e) => {
        const search = e.target.value
        await getClientsApi(search)
    }

    useEffect(() => {
        getClientsApi()
        setNotFoundFilter(false)
    }, [])

    return (
        <div className="container-home">
            <div className='fixed'>
                <Sidebar
                    page={'clients'}
                />
            </div>
            <main className='content-home'>
                <section className='section-home'>
                    <div className='header--home-clients'>
                        <UsersIcon color={'#343447'} />
                        <h1 className='client--title'>Clientes</h1>
                        <div className='actions-client'>
                            <ModalClient register />
                            <img className='filter' src={filter} alt="Filtro" />
                            <TextField
                                id="search"
                                name="search"
                                type="text"

                                placeholder="Pesquisa"
                                onChange={handleFilterClients}
                            />
                            <SearchIcon
                                className='search-icon' />
                        </div>
                    </div>
                    <section className='table'>
                        <CardClients
                            page={'clients'}
                            column1={"Clientes"}
                            column2={"CPF"}
                            column3={"Email"}
                            column4={"Telefone"}
                            column5={"Status"}
                            column6={"Criar Cobrança"} />
                    </section>
                </section>
            </main>
        </div>

    );
}

export default HomeClients;