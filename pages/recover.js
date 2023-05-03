import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import backgroundImage from "../public/images/background-login.png";
import { getProviders, getSession, signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const paperStyle = {
    padding: "40px 20px",
    height: "auto",
    width: 300,
    margin: " 25px auto",
  };
  const buttonStyle = { margin: "10px 0" };
  const containerStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: "cover",
  };
  const inputStyle = { margin: "10px auto" };

  const handleRecover = async (e) => {
    e.preventDefault()
    const response = await fetch(
      "http://localhost:8000/api/v1/dj-rest-auth/password/reset/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    setEmail('')
    if(response.status===200){
        setMessage(<Typography>Si el Correo es correcto, se ha enviado un email para recuperar su contraseña</Typography>)
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRecover}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Typography variant="h5" sx={{ color: "#036bb0" }} mb={2}>
                RECUPERAR CUENTA
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2">
                Ingrese su correo electrónico para recuperar su contraseña
              </Typography>
            </Grid>
            <TextField
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
              style={inputStyle}
              fullWidth
              required
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={buttonStyle}
            >
              Continuar
            </Button>

            <Link href="/login">
              <Button
                color="primary"
                variant="contained"
                fullWidth
                style={buttonStyle}
              >
                BACK
              </Button>
            </Link>
            {message}
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/admin/dashboard" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
