import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";
import usePay from "../../../hooks/usePay";
import ModalClient from "../../ModalClients";
import { formatCPF, formatTel } from "../../../utils/dataFormat";
import { useEffect, useState } from "react";

export default function DetailsClient(props) {
  const { detailsClient } = usePay();
  const [newData, setNewData] = useState({ tel: "", cpf: "" });


  const styleHead = {
    padding: "0.3rem 1rem",
    borderBottom: "none",
    fontSize: "1rem",
    fontFamiy: "Nunito",
    fontWeight: "700",
    color: "#3F3F55",
  };

  const styleBody = {
    padding: "0.3rem 1rem",
    borderBottom: "none",
    fontSize: "1rem",
    fontFamiy: "Nunito",
    fontWeight: "400",
    color: "#3F3F55",
  };
  useEffect(() => {
    if (detailsClient) {
      const newTel = formatTel(detailsClient.cliente.telefone);
      const newCPF = formatCPF(detailsClient.cliente.cpf);
      setNewData({
        tel: newTel,
        cpf: newCPF,
      });
    }
  }, [detailsClient]);
  const setData = () => {
    if (!detailsClient) {
      return;
    }
    return (
      <>
        <TableCell sx={styleBody}>{detailsClient.cliente.email}</TableCell>
        <TableCell sx={styleBody}>{newData.tel}</TableCell>
        <TableCell sx={styleBody}>{newData.cpf}</TableCell>
      </>
    );
  };

  const setAddress = () => {
    if (!detailsClient) {
      return;
    }
    return (
      <>
        <TableCell sx={styleBody}>{detailsClient.cliente.logradouro}</TableCell>
        <TableCell sx={styleBody}>{detailsClient.cliente.bairro}</TableCell>
        <TableCell sx={styleBody}>
          {detailsClient.cliente.complemento}
        </TableCell>
        <TableCell sx={styleBody}>{detailsClient.cliente.cep}</TableCell>
        <TableCell sx={styleBody}>{detailsClient.cliente.cidade}</TableCell>
        <TableCell sx={styleBody}>{detailsClient.cliente.estado}</TableCell>
      </>
    );
  };

  return (
    <>
      <div className="card-detail-client">
        <div className="header-detail">
          <h1 className="charge-detail-client"> Dados do Cliente</h1>
          <ModalClient edit detailsClient={detailsClient} />

        </div>
        <div className="table1">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHead}>E-mail</TableCell>
                <TableCell sx={styleHead}>Telefone</TableCell>
                <TableCell sx={styleHead}>CPF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>{setData()}</TableRow>
            </TableBody>
          </Table>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styleHead}>Endereço</TableCell>
              <TableCell sx={styleHead}>Bairro</TableCell>
              <TableCell sx={styleHead}>Complemento</TableCell>
              <TableCell sx={styleHead}>CEP</TableCell>
              <TableCell sx={styleHead}>Cidade</TableCell>
              <TableCell sx={styleHead}>UF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{setAddress()}</TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
