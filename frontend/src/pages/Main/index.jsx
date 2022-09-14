import Sidebar from '../../components/Sidebar';
import './styles.css';
import Resume from '../../components/CardsDashboard/Resume';
import Finances from '../../components/CardsDashboard/Finances';
import Clients from '../../components/CardsDashboard/Clients';
import pagas from '../../assets/cards/pagas.svg';
import previstas from '../../assets/cards/previstas.svg';
import vencida from '../../assets/cards/vencida.svg';
import inadimplentes from '../../assets/cards/clientsInad.svg'
import emdia from '../../assets/cards/clientsDia.svg'
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { formatReal } from '../../utils/dataFormat'
import usePay from '../../hooks/usePay';

function Main() {
  const [resume, setResume] = useState()
  const { chargesHome, clientsHome, getResumeCharges, getClientsResume } = usePay()

  const getResumeApi = async () => {
    const response = await api.get('/resumo/dinheiro')
    setResume(response.data)
  }

  useEffect(() => {
    getResumeApi()
    getResumeCharges()
    getClientsResume()
  }, [])

  return (
    <div className="container-home">
      <div className='fixed'>
        <Sidebar
          page={'home'}
        />
      </div>
      <main className='content-home'>
        <section className='section-home'>
          <div className='main-resume'>
            <Resume
              image={pagas}
              title={'Cobranças Pagas'}
              valor={resume && formatReal(resume.totalCobrancasPagas)} />
            <Resume
              image={vencida}
              title={'Cobranças Vencidas'}
              valor={resume && formatReal(resume.totalCobrancasVencidas)} />
            <Resume
              image={previstas}
              title={'Cobranças Pendentes'}
              valor={resume && formatReal(resume.totalCobrancasPendentes)} />
          </div>

          <div className='main-finance'>
            <Finances
              title={'Cobranças Pagas'}
              qtd={chargesHome.cobrancasPagas} />
            <Finances
              title={'Cobranças Vencidas'}
              qtd={chargesHome.cobrancasVencidas} />
            <Finances
              title={'Cobranças Pendentes'}
              qtd={chargesHome.cobrancasPendentes} />
          </div>
          <div className="main-clients">
            <Clients
              title={'Clientes Inadimplentes'}
              image={inadimplentes}
              qtd={clientsHome.clientesInadimplentes} />
            <Clients
              title={'Clientes em dia'}
              image={emdia}
              qtd={clientsHome.clientesEmDia} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
