import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import './styles.css'
import backgroundColor from '../../../utils/backgroundColor'
import usePay from '../../../hooks/usePay';
import { formatReal } from '../../../utils/dataFormat'
import { useNavigate } from 'react-router-dom';

export default function Finances(props) {
  const { payCharges, pendingCharges, overdueCharges } = usePay()
  const navigate = useNavigate('')

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

  const pay = () => {
    if (!payCharges) {
      return
    }
    const currentPay = payCharges.slice(0, 4)

    return (
      currentPay.map(item => (
        <TableRow key={item.id}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{item.id}</TableCell>
          <TableCell sx={styleBody}>{formatReal(item.valor)}</TableCell>
        </TableRow>
      ))
    )
  }

  const overdue = () => {
    if (!overdueCharges) {
      return
    }
    const currentOverdue = overdueCharges.slice(0, 4)

    return (
      currentOverdue.map(item => (
        <TableRow key={item.id}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{item.id}</TableCell>
          <TableCell sx={styleBody}>{formatReal(item.valor)}</TableCell>
        </TableRow>
      ))
    )
  }

  const pendings = () => {
    if (!pendingCharges) {
      return
    }
    const currentPending = pendingCharges.slice(0, 4)

    return (
      currentPending.map(item => (
        <TableRow key={item.id}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{item.id}</TableCell>
          <TableCell sx={styleBody}>{formatReal(item.valor)}</TableCell>
        </TableRow>
      ))
    )
  }

  const handleSeeMore = (title) => {
    navigate(`/charges/filter/${title}`)
  }

  return (
    <>
      <div className='card-finance'>
        <div className='head-finance'>
          <h3 className='title-finance'>{props.title}</h3>
          <p className={`qtd_finance ${backgroundColor(props.title)}`}>{props.qtd}</p>
        </div>
        <div className='content-finance'>
          <Table className='table'>
            <TableHead>
              <TableCell sx={styleHead}>Cliente</TableCell>
              <TableCell sx={styleHead}>ID da cob.</TableCell>
              <TableCell sx={styleHead}>Valor</TableCell>
            </TableHead>
            <TableBody>
              {props.title === 'Cobranças Pagas' && pay()}
              {props.title === 'Cobranças Vencidas' && overdue()}
              {props.title === 'Cobranças Pendentes' && pendings()}

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