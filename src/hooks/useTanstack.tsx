import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Button from "@components/ui/Button";
import { Checkbox, Radio, Select, TextField } from "@mui/material";

export const { fieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Radio,
    Select,
    Checkbox,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});
