import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepContent, { StepContentProps } from "@mui/material/StepContent";
import { styled } from "@mui/material/styles";

export const StepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    marginLeft: 6,
    width: 3,
    border: 3,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      borderLeftColor: theme.palette.grey[800],
    }),
    marginBottom: 1,
  },
}));

export const StepContentStyled = styled(StepContent)(({ theme }) => ({
  marginLeft: 18,
  borderLeft: "3px solid #eaeaf0",
  "& .MuiCollapse-vertical": {
    marginLeft: 3,
  },
}));
