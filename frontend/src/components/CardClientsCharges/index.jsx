import { Table, TableBody } from "@mui/material";
import "./styles.css";
import usePay from "../../hooks/usePay";
import notFound from '../../assets/filter/notFound.svg'
import RenderTableHeaderClients from "../Tables/TablesHeader/TableHeaderClients";
import RenderTableHeaderCharges from "../Tables/TablesHeader/TableHeaderCharges";
import RenderTableRowClients from "../Tables/TablesRows/TableRowClients";
import RenderTableRowCharges from "../Tables/TablesRows/TableRowCharges";
import RenderPayTable from "../Tables/TablesRows/TableRowPayClients";
import RenderDefaulterClients from "../Tables/TablesRows/TableRowDefaulterClients";
import RenderPayCharges from "../Tables/TablesRows/TableRowPayCharges";
import RenderPendingCharges from "../Tables/TablesRows/TableRowPendingCharges";
import RenderOverdueCharges from "../Tables/TablesRows/TableRowOverdueCharges";

export default function CardClientCharges(props) {
  const {
    notFoundFilter
  } = usePay();

  return (
    <div className="card-clients-home">
      <Table>
        {props.page === "clients" && <RenderTableHeaderClients
          column={'Clientes'}
          page={props.page} />}
        {props.page === "clientsFilter" && <RenderTableHeaderClients
          page={props.page}
          column={'Clientes'} />}
        {props.page === "charges" && <RenderTableHeaderCharges
          column={'Clientes'}
          page={props.page} />}
        {props.page === "chargesFilter" && <RenderTableHeaderCharges
          column={'Clientes'}
          page={props.page} />}
        <TableBody>
          {props.page === "clients" && <RenderTableRowClients />}
          {props.page === "charges" && <RenderTableRowCharges />}
          {props.idCharges === "Cobranças Pagas" && <RenderPayCharges />}
          {props.idCharges === "Cobranças Vencidas" && <RenderOverdueCharges />}
          {props.idCharges === "Cobranças Pendentes" && <RenderPendingCharges />}
          {props.idClients === 'Clientes Inadimplentes' && <RenderDefaulterClients />}
          {props.idClients === 'Clientes em dia' && <RenderPayTable />}
        </TableBody>
      </Table>
      {notFoundFilter &&
        <div className="not--Found">
          <img className="img-notFound" src={notFound} alt="Não Encontrado" />
          <h2 className="title--notfound">Nenhum resultado foi encontrado!</h2>
          <h2 className="subtitle--notfound">Verifique se escrita está correta</h2>
        </div>
      }
    </div>
  );
}
