import {
  TableCell,
  TableRow,
} from "@mui/material";
import {
  formatCPF,
  formatTel
} from "../../../utils/dataFormat";
import usePay from "../../../hooks/usePay";
import ModalAddCharge from "../../ModalCharge";
import { useNavigate } from "react-router-dom";

export default function RenderTableRowClients() {
  const {
    clients
  } = usePay();

  const navigate = useNavigate("");
  const detailCLient = (item) => {
    navigate(`/clients/${item.id}`);
  };

  const styleBody = {
    fontSize: "0.8rem",
    fontFamiy: "Nunito",
    fontWeight: "400",
    color: "#6E6E85",
  };

  const cursor = {
    cursor: "pointer",
  };

  if (!clients) {
    return
  }

  return (
    <>
      {clients.map((item) => (
        <TableRow key={item.id} sx={cursor} onClick={() => detailCLient(item)}>
          <TableCell sx={styleBody}>{item.nome}</TableCell>
          <TableCell sx={styleBody}>{formatCPF(item.cpf)}</TableCell>
          <TableCell sx={styleBody}>{item.email}</TableCell>
          <TableCell sx={styleBody}>{formatTel(item.telefone)}</TableCell>
          <TableCell sx={styleBody}>
            <p className={!item.status ? "inadimplente" : "emdia"}>
              {!item.status ? "Inadimplente" : "Em Dia"}
            </p>
          </TableCell>
          <TableCell onClick={(e) => e.stopPropagation()}>
            <ModalAddCharge
              clientName={item.nome}
              clientId={item.id}
              page="clients"
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
};