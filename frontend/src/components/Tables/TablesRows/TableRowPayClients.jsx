import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePay from "../../../hooks/usePay";
import { formatCPF, formatTel } from "../../../utils/dataFormat";
import ModalAddCharge from "../../ModalCharge";

export default function RenderPayTable() {
  const { payClients } = usePay();
  const navigate = useNavigate("");

  const styleBody = {
    fontSize: "0.8rem",
    fontFamiy: "Nunito",
    fontWeight: "400",
    color: "#6E6E85",
  };

  const cursor = {
    cursor: "pointer",
  };

  const detailClient = (item) => {
    navigate(`/clients/${item.id}`);
  };

  if (!payClients) {
    return;
  }

  return (
    <>
      {payClients.map((item) => (
        <TableRow key={item.id} sx={cursor} onClick={() => detailClient(item)}>
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
  );
}
