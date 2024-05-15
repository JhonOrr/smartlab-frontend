import { Typography, Button,Stack, Grid } from '@mui/material';
import logo from '../../../public/images/logo.png'
import styles from '../styles/welcome.module.css' 

export default function Dashboard(){
    return (
        <div className={styles.dashboardWelcome}>
            <div>
              <Stack spacing={6}>
                <Grid item>
                  <img src={logo.src} alt='logo'/>
                </Grid>
                <Grid item>    
                  <Typography variant='h2'>Bienvenido a la plataforma Smartlab</Typography>
                  <Typography variant='subtitle'>Líderes en en análisis de aceites</Typography>
                </Grid>
                <Grid item>
                    <Button variant='contained'>Get Started</Button>
                </Grid>
              </Stack>  
            </div>
        </div>
      )
}