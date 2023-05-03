import React, {useState} from 'react';
import {Grid, Paper, TextField, FormControlLabel, Typography, Button, Switch} from '@mui/material';
import backgroundImage from '../public/images/background-login.png'
import { useRouter } from 'next/router';
import {getProviders, getSession, signIn} from "next-auth/react"
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';

const Login = () => {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const paperStyle={padding: '40px 20px', height:'auto', width:280, margin:' 25px auto', }
  const buttonStyle = {margin:'10px 0'}
  const containerStyle = {height:'100vh', display:'flex', alignItems:'center',
  justifyContent:'center', backgroundImage:`url(${backgroundImage.src})`, backgroundSize:'cover'}
  const inputStyle = {margin:'10px auto'}

  // const handleLogin=async(e)=>{
  //   e.preventDefault();
  //   await signIn("credentials",{email, password})
  // }

    const handleLogin=async(e)=>{
    e.preventDefault();
    await signIn("credentials",{email, password,redirect:false}, )
    router.push('/admin/dashboard')
  }



  return (
    <div style={containerStyle}>

      <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Typography variant='h5' sx={{color:'#036bb0'}}>INICIAR SESIÓN</Typography>
        </Grid>
        <form onSubmit={handleLogin}>
        <TextField
          value={email}
          label='Email' 
          placeholder='Email'
          type='email'
          variant='standard'
          style={inputStyle} 
          fullWidth
          required
          error={email === "" || !email.includes("@")}
          helperText={email === "" ? "Email is required" : !email.includes("@") ? "Invalid email" : ""}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <TextField 
          value={password}
          label='Password' 
          placeholder='Enter Password' 
          variant='standard' 
          style={inputStyle} 
          type='password' 
          fullWidth 
          required
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <FormControlLabel
          control={<Switch/>}
          label = 'Remember me'
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
          style={buttonStyle}
        >LOGIN</Button>
        <Button  color='primary' variant='contained' fullWidth style={buttonStyle}>BACK</Button>  
        <Typography>
          <Link href='/recover'>Forgot password?</Link>
        </Typography>
        </form>
      </Paper>
    </Grid>
    </div>
    
  )
}

export default Login;



export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders()
  if (session) {
      return {
          redirect: { destination: "/admin/dashboard" },
      };
  }
  return {
      props: {
          providers,
      },
  }
}
