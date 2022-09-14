import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import './styles.css'
import usePay from '../../../hooks/usePay';
import { formatCPF } from '../../../utils/dataFormat';
import { useNavigate } from 'react-router-dom';

export default function Clients(props) {
  const navigate = useNavigate('')

  const { defaulterClients, payClients } = usePay()
  const styleHead = {
    fontSize: '1rem',
    fontFamiy: 'Nunito',
    fontWeight: '700',
    color: '#3F3F55'
  };

  const styleBody = {
    fontSize: '0.8rem',
    fontFamiy: 'Nunito',
    fontWeight: '400',
    color: '#6E6E85'
  };

  const defaulter = () => {
    if (!defaulterClients) {
      return
    }
    const currentDefaulter = defaulterClients.slice(0, 4)

    return (
      currentDefaulter.map(item => (
        <TableRow key={item.id}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{item.id}</TableCell>
          <TableCell sx={styleBody}>{formatCPF(item.cpf)}</TableCell>
        </TableRow>
      ))
    )
  }

  const pay = () => {
    if (!payClients) {
      return
    }
    const currentPayClients = payClients.slice(0, 4)

    return (
      currentPayClients.map(item => (
        <TableRow key={item.id}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{item.id}</TableCell>
          <TableCell sx={styleBody}>{formatCPF(item.cpf)}</TableCell>
        </TableRow>
      ))
    )
  }

  const handleSeeMore = (title) => {
    navigate(`/clients/filter/${title}`)
  }


  return (
    <>
      <div className='card-client'>
        <div className='head-client'>
          <div className='content-title'>
            <img src={props.image} alt="Imagem Resumo" />
            <h3 className='title-client'>{props.title}</h3>
          </div>
          <p className={props.title === 'Clientes Inadimplentes' ? 'qtd_client red' : 'qtd_client blue'}>{props.qtd}</p>
        </div>
        <div className='content-client'>
          <Table className='table'>
            <TableHead>
              <TableCell sx={styleHead}>Clientes</TableCell>
              <TableCell sx={styleHead}>ID do Cliente</TableCell>
              <TableCell sx={styleHead}>CPF</TableCell>
            </TableHead>
            <TableBody>
              {props.title === 'Clientes Inadimplentes' && defaulter()}
              {props.title === 'Clientes em dia' && pay()}
            </TableBody>
          </Table>
        </div>
        <div className='link-client'>
          <span className='link-card' href='#'
            onClick={() => handleSeeMore(props.title)}>Ver todos</span>
        </div>
      </div>
    </>
  )
}