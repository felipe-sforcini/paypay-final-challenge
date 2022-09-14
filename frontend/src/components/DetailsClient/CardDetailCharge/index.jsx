import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";
import usePay from "../../../hooks/usePay";
import {
  formatReal,
  formatDate,
  chargeStatus,
} from "../../../utils/dataFormat";
import ModalAddCharge from "../../ModalCharge";
import DeleteCharge from "../../ModalDeleteCharges";
import ChargeDetail from "../../ChargeDetail";
import ModalEditCharge from "../../ModalEditCharge";

export default function ChargeClient() {
  const {
    detailsClient,
    openModalDetailCharge,
    setOpenModalDetailCharge,
    setDetailChargeId,
  } = usePay();

  const styleHead = {
    fontSize: "1rem",
    fontFamiy: "Nunito",
    fontWeight: "700",
    color: "#3F3F55",
  };

  const styleBody = {
    fontSize: "1rem",
    fontFamiy: "Nunito",
    fontWeight: "400",
    color: "#3F3F55",
  };
  const openDetailCharge = (id) => {
    setDetailChargeId(id);
    setOpenModalDetailCharge(true);
  };

  const setData = () => {
    if (!detailsClient || !detailsClient.cobrancas[0]) {
      return;
    }

    return detailsClient.cobrancas.map((item) => (
      <TableRow
        key={item.id}
        onClick={() => openDetailCharge(item.id)}
        style={{ cursor: "pointer" }}
      >
        {openModalDetailCharge && <ChargeDetail charge={item} />}
        <TableCell sx={styleBody}>{item.id}</TableCell>
        <TableCell sx={styleBody}>{formatDate(item.vencimento)}</TableCell>
        <TableCell sx={styleBody}>{formatReal(item.valor)}</TableCell>
        <TableCell sx={styleBody}>{chargeStatus(item.status)}</TableCell>
        <TableCell sx={styleBody}>{item.descricao}</TableCell>
        <TableCell sx={styleBody} onClick={(e) => e.stopPropagation()}>
          <div className="desc">
            <ModalEditCharge charge={item} page="detailClient" />{" "}
            <DeleteCharge charge={item} />
          </div>
        </TableCell>
      </TableRow>
    ));
  };
  return (
    <>
      <div className="card-detail-client">
        <div className="header-detail">
          <h1 className="header-detail-title"> Cobranças do Cliente</h1>
          {detailsClient && (
            <ModalAddCharge
              clientName={detailsClient.cliente.nome}
              clientId={detailsClient.cliente.id}
              page="detailClient"
            />
          )}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styleHead}>ID Cob.</TableCell>
              <TableCell sx={styleHead}>Data de venc.</TableCell>
              <TableCell sx={styleHead}>Valor</TableCell>
              <TableCell sx={styleHead}>Status</TableCell>
              <TableCell sx={styleHead}>Descrição</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{setData()}</TableBody>
        </Table>
      </div>
    </>
  );
}
