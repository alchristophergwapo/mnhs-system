"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppForm } from "@hooks/useTanstack";
import Input from "@components/ui/Input";
import { UpdaterFn } from "@tanstack/react-form";
import Link from "@components/ui/Link";
import Button from "@components/ui/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import useNavigate from "@hooks/useNavigate";

function Login() {
  const [loginType, setLoginType] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const defaultFormData = {
    email: "",
    username: "christoff.al_0_1_2000",
    password: "ChristoffAl012000",
  };
  const { data: session, status } = useSession();
  const navigate = useNavigate();

  if (session && status === "authenticated") {
    if (session.user.role === "STUDENT") {
      navigate("/student/dashboard");
    } else if (session.user.role === "ADMIN") {
      navigate("/dashboard");
    }
  }

  const form = useAppForm({
    defaultValues: defaultFormData,
    onSubmit: (data) => {
      const values = data.value;
      const credentials = {
        password: values.password,
        redirect: false,
      } as any;

      if (loginType === "email") {
        credentials.email = values.email;
      } else {
        credentials.username = values.username;
      }

      signIn("credentials", credentials)
        .then()
        .catch((err) => {
          console.log(err);
        });
      // console.log(result)

      // if (result?.error) {
      //   console.log('auth error', result?.error);
      //   // TODO: show error
      // } else {
      //   console.log(result)
      // }
    },
  });

  const handleChangeLoginType = (
    e: React.MouseEvent<HTMLElement>,
    newLoginType: string,
  ) => {
    setLoginType(newLoginType);
  };

  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-8">
      <Paper
        className="w-full max-w-sm sm:w-auto md:max-w-6xl flex min-h-full sm:min-h-auto overflow-hidden rounded-none sm:rounded-xl shadow-xl sm:shadow-sm"
        elevation={4}
      >
        <Box
          className="relative hidden h-full flex-auto md:flex overflow-hidden items-center justify-center p-16 lg:px-28"
          sx={{
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
          }}
        >
          <div className="w-full relative z-10 max-w-4xl">
            <div className="text-4xl font-bold leading-none text-gray-100">
              <div>Welcome back</div>
              <div>to MNHS</div>
            </div>
            <div>Lorem ipsum </div>
          </div>
        </Box>

        <div className="w-full sm:w-auto px-4 py-8 sm:p-12 md:p-16">
          <div className="mx-auto flex flex-col justify-center items-center w-full max-w-80 sm:mx-0 sm:w-80">
            <img
              className="w-auto h-8 mx-auto sm:mx-0 mb-4"
              src="/next.svg"
              alt="MNHS"
              loading="eager"
            />

            <form.AppForm>
              <div className="w-full flex flex-col gap-8 justify-center mt-8">
                <div className="flex flex-col gap-2">
                  <Typography>Login using?</Typography>
                  <ToggleButtonGroup
                    color="primary"
                    value={loginType}
                    exclusive
                    onChange={handleChangeLoginType}
                    aria-label="Login type"
                    size="small"
                  >
                    <ToggleButton value="email">Email</ToggleButton>
                    <ToggleButton value="username">Username</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {loginType === "email" ? (
                  <form.Field
                    name={"email"}
                    children={(field) => (
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => {
                          const value: unknown = e.target.value;
                          field.handleChange(
                            value as UpdaterFn<string, string>,
                          );
                        }}
                        type="email"
                        label="Email address"
                      />
                    )}
                  />
                ) : (
                  <form.Field
                    name={"username"}
                    children={(field) => (
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => {
                          const value: unknown = e.target.value;
                          field.handleChange(
                            value as UpdaterFn<string, string>,
                          );
                        }}
                        label="Username"
                      />
                    )}
                  />
                )}
                <form.Field
                  name={"password"}
                  children={(field) => {
                    return (
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => {
                          const value: unknown = e.target.value;
                          field.handleChange(
                            value as UpdaterFn<string, string>,
                          );
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {!showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            ),
                          },
                        }}
                        type={!showPassword ? "password" : "text"}
                        label="Password"
                      />
                    );
                  }}
                />

                <div className="flex flex-col sm:flex-row-reverse items-center">
                  <Link className="text-md font-medium" to="#">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" onClick={form.handleSubmit}>
                  sign in
                </Button>
              </div>
            </form.AppForm>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
