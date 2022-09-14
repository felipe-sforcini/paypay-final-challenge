import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import UserIcon from "../../assets/modal/UserIcon.svg";
import CloseIcon from "../../assets/modal/CloseIcon.svg";
import "./style.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import usePay from "../../hooks/usePay";
import editIcon from "../../assets/modal/edit.svg";
import * as yup from "yup";
import ToastSuccess from "../../helpers/toastSuccess";
import ToastError from "../../helpers/toastError";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function ModalClient({ edit, register }) {
  const {
    getClientsApi,
    setDetailsClient,
    handleGetClient,
    detailsClient,
    getClientsResume,
  } = usePay();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    telefone: "",
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (edit && detailsClient) {
      setForm({
        nome: detailsClient.cliente.nome,
        email: detailsClient.cliente.email,
        cpf: detailsClient.cliente.cpf,
        telefone: detailsClient.cliente.telefone,
        cep: detailsClient.cliente.cep,
        bairro: detailsClient.cliente.bairro,
        endereco: detailsClient.cliente.logradouro,
        complemento: detailsClient.cliente.complemento,
        cidade: detailsClient.cliente.cidade,
        uf: detailsClient.cliente.estado,
      });
    }
  }, [detailsClient]);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "cpf" || name === "telefone") {
      if (value.length > 11) {
        return;
      }
    }
    setErrors({ ...errors, [name]: false });
    setForm({ ...form, [name]: value });
  };
  const registerUser = async () => {
    try {
      await api.post("/clientes", {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        logradouro: form.endereco,
        cep: form.cep,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.uf,
      });
      await getClientsApi();
      await getClientsResume();

      setErrors({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        geral: "",
      });

      setForm({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        endereco: "",
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: "",
      });
      setOpenModal(false);
      ToastSuccess("Cliente Cadastrado");
    } catch (error) {
      if (error.response.data.mensagem === "Esse cpf já foi cadastrado") {
        return setErrors({ ...errors, cpf: error.response.data.mensagem });
      }
      ToastError("Não foi possível cadastrar o cliente");
      return cleanModal();
    }
  };

  const editUser = async () => {
    try {
      await api.put(`/clientes/${detailsClient.cliente.id}`, {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        logradouro: form.endereco,
        complemento: form.complemento,
        cep: form.cep,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.uf,
      });
      setDetailsClient({ ...detailsClient, cliente: form });
      setErrors({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        geral: "",
      });

      await handleGetClient(detailsClient.cliente.id);
      setOpenModal(false);
      ToastSuccess("Cliente editado");
    } catch (error) {
      if (
        error.response.data.mensagem ===
        "Já existe um cliente cadastrado com o cpf informado"
      ) {
        return setErrors({ ...errors, cpf: error.response.data.mensagem });
      }
      ToastError("Não foi possível editar o cliente");
      return cleanModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function validate() {
      let schema = yup.object().shape({
        telefone: yup
          .string()
          .required({ telefone: "O campo telefone é obrigatório" })
          .matches(/^[0-9]+$/, { telefone: "Insira um telefone válido" })
          .min(8, { telefone: "Insira no mínimo 8 dígitos" })
          .max(11, { telefone: "Insira  no máximo 11 dígitos" }),
        cpf: yup
          .string()
          .required({ cpf: "O campo cpf é obrigatório" })
          .matches(/^[0-9]+$/, { cpf: "Insira um cpf válido" })
          .min(11, { cpf: "Insira um cpf válido" })
          .max(11, { cpf: "Insira um cpf válido" }),
        email: yup
          .string()
          .email({ email: "Insira um e-mail válido" })
          .required({ email: "O campo e-mail é obrigatório" }),
        nome: yup.string().required({ nome: "O campo nome é obrigatório" }),
      });
      try {
        await schema.validate({
          nome: form.nome,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
        });
        return true;
      } catch (error) {
        setErrors(error.errors[0]);
        return false;
      }
    }

    if (!(await validate())) return;
    register && (await registerUser());
    edit && (await editUser());
  };

  const completeAddress = async () => {
    if (!form.cep) {
      return;
    }
    const url = `https://viacep.com.br/ws/${form.cep}/json/`;
    const response = await fetch(url);
    const addressData = await response.json();
    setForm({
      ...form,
      endereco: addressData.logradouro,
      bairro: addressData.bairro,
      cidade: addressData.localidade,
      uf: addressData.uf,
    });
  };

  const cleanModal = () => {
    setOpenModal(false);
    setErrors({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      geral: "",
    });

    setForm({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      endereco: "",
      complemento: "",
      cep: "",
      bairro: "",
      cidade: "",
      uf: "",
    });
  };
  const openEditModal = () => {
    setOpenModal(true);
    setForm({
      nome: detailsClient.cliente.nome,
      email: detailsClient.cliente.email,
      cpf: detailsClient.cliente.cpf,
      telefone: detailsClient.cliente.telefone,
      cep: detailsClient.cliente.cep,
      bairro: detailsClient.cliente.bairro,
      endereco: detailsClient.cliente.logradouro,
      complemento: detailsClient.cliente.complemento,
      cidade: detailsClient.cliente.cidade,
      uf: detailsClient.cliente.estado,
    });
  };

  return (
    <div>
      {register && (
        <Button
          disableElevation
          variant="contained"
          type="button"
          onClick={() => setOpenModal(true)}
        >
          + Adicionar cliente
        </Button>
      )}
      {edit && (
        <Button className="btn-edit-client" onClick={() => openEditModal()}>
          <img className="edit-btn" src={editIcon} alt="editar" />
          Editar Cliente
        </Button>
      )}
      <Modal
        sx={{
          backgroundColor: "#919A964D",
          backdropFilter: "blur(4px);",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style} className="modal__clientsRespon">
            <form onSubmit={handleSubmit} className="modal__cadastro">
              <div className="close-modal">
                <img
                  src={CloseIcon}
                  alt="Close Icon"
                  className="modal___close"
                  onClick={() => cleanModal()}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="title--modal">
                <img src={UserIcon} alt="User Icon" />
                {register && <h1>Cadastro do cliente</h1>}
                {edit && <h1>Editar Cliente</h1>}
              </div>
              <InputLabel htmlFor="nome">Nome*</InputLabel>
              <TextField
                id="nome"
                name="nome"
                className="input"
                type="text"
                error={errors.nome ? true : false}
                helperText={errors.nome}
                value={form.nome}
                onChange={handleChangeInput}
              />
              <InputLabel htmlFor="email">E-mail*</InputLabel>
              <TextField
                id="email"
                type="text"
                name="email"
                className="input"
                error={errors.email ? true : false}
                helperText={errors.email}
                value={form.email}
                onChange={handleChangeInput}
              />
              <div className="half-input">
                <div className="cpf grow">
                  <InputLabel htmlFor="cpf">CPF*</InputLabel>
                  <TextField
                    id="cpf"
                    type="number"
                    name="cpf"
                    className="input width100"
                    error={errors.cpf ? true : false}
                    helperText={errors.cpf}
                    value={form.cpf}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="telefone grow">
                  <InputLabel htmlFor="telefone">Telefone*</InputLabel>
                  <TextField
                    id="telefone"
                    type="number"
                    name="telefone"
                    className="input width100"
                    error={errors.telefone ? true : false}
                    helperText={errors.telefone}
                    value={form.telefone}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="half-input">
                <div className="cep grow">
                  <InputLabel htmlFor="cep">CEP</InputLabel>
                  <TextField
                    id="cep"
                    name="cep"
                    type="number"
                    className="input width100"
                    value={form.cep}
                    onChange={handleChangeInput}
                    onBlur={completeAddress}
                  />
                </div>
                <div className="bairro grow">
                  <InputLabel htmlFor="bairro">Bairro</InputLabel>
                  <TextField
                    id="bairro"
                    type="text"
                    name="bairro"
                    className="input width100"
                    value={form.bairro}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <InputLabel htmlFor="endereco">Endereço</InputLabel>
              <TextField
                id="endereco"
                type="text"
                name="endereco"
                className="input"
                value={form.endereco}
                onChange={handleChangeInput}
              />
              <InputLabel htmlFor="complemento">Complemento</InputLabel>
              <TextField
                id="complemento"
                type="text"
                name="complemento"
                className="input"
                value={form.complemento}
                onChange={handleChangeInput}
              />
              <div className="half-input">
                <div className="cidade grow">
                  <InputLabel htmlFor="cidade">Cidade*</InputLabel>
                  <TextField
                    id="cidade"
                    type="text"
                    name="cidade"
                    className="input width100"
                    value={form.cidade}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="uf" style={{ maxWidth: "33%" }}>
                  <InputLabel htmlFor="uf">UF</InputLabel>
                  <TextField
                    id="uf"
                    name="uf"
                    className="input"
                    type="text"
                    value={form.uf}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="buttons">
                <Button
                  variant="outlined"
                  className="btn-cancel"
                  type="button"
                  onClick={() => cleanModal()}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  className="btn-submit"
                  type="submit"
                >
                  Aplicar
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
