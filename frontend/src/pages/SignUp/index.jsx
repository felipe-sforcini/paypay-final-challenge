import "./style.css";
import SignupStepper from "../../components/Stepper";
import { useState } from "react";
import { Button, TextField, InputAdornment, InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RegisterSuccess from "../../components/RegisterSuccess";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ToastError from "../../helpers/toastError";

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [eyes, setEyes] = useState({ eye1: false, eye2: false });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const changeTypePassword = (eye) => {
    const localEyes = { ...eyes };
    if (eye === 1) {
      localEyes.eye1 = !localEyes.eye1;
      return setEyes(localEyes);
    } else {
      localEyes.eye2 = !localEyes.eye2;
      return setEyes(localEyes);
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setErrors({ ...errors, [e.target.name]: false });
    setForm({ ...form, [e.target.name]: value });
  };

  const nextStep = async (e) => {
    e.preventDefault();
    async function validate() {
      let schema = yup.object().shape({
        email: yup
          .string()
          .email({ email: "Insira um e-mail válido" })
          .required({ email: "O campo e-mail é obrigatório" }),
        name: yup.string().required({ name: "O campo nome é obrigatório" }),
      });
      try {
        await schema.validate({ name: form.name, email: form.email });
        return true;
      } catch (error) {
        setErrors(error.errors[0]);
        return false;
      }
    }
    if (!(await validate())) return;
    try {
      const { data: users } = await api.get("/usuarios");
      const foundUser = users.find((user) => {
        return user.email === form.email;
      });
      if (foundUser) {
        return setErrors({ email: "E-mail já cadastrado" });
      }
    } catch (error) {
      return ToastError(error.response.data.mensagem);
    }

    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length !== form.repeatPassword.length) {
      return setErrors({
        password: "Senhas não coincidem",
        repeatPassword: "Senhas não coincidem",
      });
    }
    async function validate() {
      let schema = yup.object().shape({
        repeatPassword: yup
          .string({ repeatPassword: "Senhas não coincidem" })
          .required({ repeatPassword: "O campo Repita a senha é obrigatório" })
          .min(6, { repeatPassword: "Senhas não coincidem" })
          .matches(form.password, {
            message: { repeatPassword: "Senhas não coincidem" },
          }),
        password: yup
          .string({ password: "O campo senha é obrigatório" })
          .required({ password: "O campo senha é obrigatório" })
          .min(6, { password: "Senha deve ter no mínimo 6 caracteres" }),
      });
      try {
        await schema.validate({
          password: form.password,
          repeatPassword: form.repeatPassword,
        });
        return true;
      } catch (error) {
        setErrors(error.errors[0]);
        return false;
      }
    }
    if (!(await validate())) return;
    try {
      await api.post("/usuario", {
        nome: form.name,
        email: form.email,
        senha: form.password,
      });
      setCurrentStep(3);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      ToastError(error.response.data.mensagem);
    }
  };
  return (
    <div className="container-signup">
      <div className="container-stepper">
        <div className="stepper-content">
          <SignupStepper currentStep={currentStep} />
        </div>
      </div>
      <div className="box-signup">
        <div className={`card-signup ${currentStep === 3 && "success"}`}>
          {currentStep === 0 && (
            <form onSubmit={(e) => nextStep(e)}>
              <h1 className="title-signup">Adicione seus dados</h1>
              <div className="inputs">
                <InputLabel htmlFor="name">Nome*</InputLabel>
                <TextField
                  id="name"
                  name="name"
                  error={errors.name}
                  helperText={errors.name}
                  placeholder="Digite seu nome"
                  onChange={(e) => handleChangeInput(e)}
                  value={form.name}
                  fullWidth
                  autoFocus
                  disableUnderline
                  type="text"
                  classes="card-input"
                />

                <InputLabel htmlFor="email">E-mail*</InputLabel>
                <TextField
                  id="email"
                  name="email"
                  error={errors.email}
                  helperText={errors.email}
                  placeholder="Digite seu e-mail"
                  onChange={(e) => handleChangeInput(e)}
                  value={form.email}
                  fullWidth
                  disableUnderline
                  type="text"
                  classes="card-input"
                />
              </div>
              <Button variant="contained" type="submit">
                Continuar
              </Button>
              <span>
                Já possui uma conta? Faça seu{" "}
                <Link to="/login" className="link-signup">
                  Login
                </Link>
              </span>
            </form>
          )}
          {currentStep === 1 && (
            <>
              <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className="title-signup">Escolha uma senha</h1>
                <div className="inputs">
                  <InputLabel htmlFor="password">Senha*</InputLabel>
                  <TextField
                    id="password"
                    name="password"
                    type={eyes.eye1 ? "text" : "password"}
                    error={errors.password}
                    helperText={errors.password}
                    onChange={(e) => handleChangeInput(e)}
                    value={form.password}
                    disableUnderline
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {eyes.eye1 ? (
                            <VisibilityIcon
                              onClick={() => changeTypePassword(1)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => changeTypePassword(1)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    classes="card-input"
                  />
                  <InputLabel htmlFor="password-repeat">
                    Repita a senha*
                  </InputLabel>
                  <TextField
                    id="password-repeat"
                    name="repeatPassword"
                    type={eyes.eye2 ? "text" : "password"}
                    onChange={(e) => handleChangeInput(e)}
                    value={form.repeatPassword}
                    error={errors.repeatPassword}
                    helperText={errors.repeatPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {eyes.eye2 ? (
                            <VisibilityIcon
                              onClick={() => changeTypePassword(2)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => changeTypePassword(2)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    disableUnderline
                    classes="input-card"
                  />
                </div>
                <Button disableElevation variant="contained" type="submit">
                  Finalizar cadastro
                </Button>
              </form>
              <span>
                Já possui uma conta? Faça seu{" "}
                <Link to="/login" className="link-signup">
                  Login
                </Link>
              </span>
            </>
          )}
          {currentStep === 3 && <RegisterSuccess />}
        </div>
        <div className="progress-box">
          <span
            className={`progressbar ${currentStep === 0 && "active"}`}
          ></span>
          <span
            className={`progressbar ${currentStep === 1 && "active"}`}
          ></span>
          <span
            className={`progressbar ${currentStep === 3 && "active"}`}
          ></span>
        </div>
      </div>
    </div>
  );
}
