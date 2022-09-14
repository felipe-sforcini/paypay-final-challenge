import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import "./style.css";
const steps = [
  {
    label: "Cadastre-se",
    description: "Por favor, escreva seu nome e e-mail",
  },
  {
    label: "Escolha uma senha",
    description: "Escolha uma senha segura",
  },
  {
    label: "Cadastro realizado com sucesso",
    description: "E-mail e senha cadastrados com sucesso",
  },
];
export default function SignupStepper({ currentStep }) {
  return (
    <div className="stepper">
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography
                component="h1"
                className={`${currentStep > index ? "complete" : ""} ${
                  currentStep === 2 && "complete"
                }`}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
