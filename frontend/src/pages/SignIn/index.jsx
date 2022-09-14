import "./styles.css";
import { TextField, InputLabel, Button, InputAdornment } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { setItem } from "../../utils/storage";
import api from "../../services/api";
import ToastError from "../../helpers/toastError";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [eye, setEye] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.email) {
        return setErrors({ email: "O campo Email é obrigatório" });
      }
      if (!form.password) {
        return setErrors({ password: "O campo Senha é obrigatório" });
      }

      const response = await api.post("/login", {
        email: form.email,
        senha: form.password,
      });

      const { token } = response.data;
      const { id, nome } = response.data.user;
      setItem("token", token);
      setItem("userID", id);
      setItem("userName", nome);
      navigate("/home");
    } catch (error) {
      return ToastError(error.response.data.mensagem);
    }
  };
  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setErrors({ ...errors, [name]: false });

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="container-signin">
      <div className="background-signin">
        <h2 className="title-bg">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h2>
      </div>

      <div className="box-signin">
        <h1 className="title-signin">Faça seu login!</h1>
        <form className="card-signin" onSubmit={handleSubmit}>
          <div className="inputs">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <TextField
              id="email"
              name="email"
              error={errors.email}
              helperText={errors.email}
              placeholder="Digite seu e-mail"
              fullWidth
              disableUnderline
              type="email"
              classes="card-input"
              value={form.email}
              onChange={handleChangeInput}
            />
            <div className="label-res-password">
              <InputLabel htmlFor="password">Senha</InputLabel>
              <a className="link-signin" href="#">
                Esqueceu a senha?
              </a>
            </div>

            <TextField
              id="password"
              name="password"
              type={eye ? "text" : "password"}
              disableUnderline
              error={errors.password}
              helperText={errors.password}
              placeholder="Digite sua senha"
              value={form.password}
              onChange={handleChangeInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {eye ? (
                      <Visibility onClick={() => setEye(!eye)} />
                    ) : (
                      <VisibilityOff onClick={() => setEye(!eye)} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button disableElevation variant="contained" type="submit">
            Entrar
          </Button>
        </form>
        <span className="register">
          Ainda não possui uma conta?{" "}
          <Link to="/cadastrar" className="link-signin">
            Cadastre-se
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignIn;
