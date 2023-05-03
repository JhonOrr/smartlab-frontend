import React, {useState} from 'react';
import {Grid, Paper, TextField, FormControlLabel, Typography, Button, Switch} from '@mui/material';
import backgroundImage from '@/public/images/background-login.png'
import { useRouter } from 'next/router';
import Link from 'next/link';

function Reset(){
    const router = useRouter()
    const {params = []} = router.query
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')


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

      const handleSubmit=async(e)=>{
        const Uid = params[0];
        const token = params[1];
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8000/api/v1/dj-rest-auth/password/reset/confirm/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "new_password1":password1,
                "new_password2": password2,
                "uid": Uid,
                "token": token
              }),
            }
          );
        console.log(params[1])
        router.push('/login')
      }
    
    return (
        <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Typography variant="h5" sx={{ color: "#036bb0" }}>
                RECUPERAR CUENTA
              </Typography>
            </Grid>
            <Grid>

            </Grid>
            <TextField
              label="Nueva contraseña"
              placeholder="Nueva Contraseña"
              type="password"
              variant="standard"
              style={inputStyle}
              fullWidth
              required
              value={password1}
              onChange={(e)=>setPassword1(e.target.value)}
            />

            <TextField
              label="Confime Nueva Contraseña"
              placeholder="Nueva contraseña"
              type="password"
              variant="standard"
              style={inputStyle}
              fullWidth
              required
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
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
          </Paper>
        </Grid>
      </form>
    </div>
    )
}

export default Reset