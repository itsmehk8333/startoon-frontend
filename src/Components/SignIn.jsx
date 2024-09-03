import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import instance from './Auth/Auth';
import SimpleBackdrop from './Backdrop';
import AlertComponent from './Alerts';
import logo from "../Utilities/logo.png"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [backdropOn, setBackdropOn] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("")
  const navigate = useNavigate()
  const [alertOn, setAlertOn] = React.useState(false)



  function LoginFunc(e) {
    e.preventDefault()


    instance.post("/auth/login", {
      emailId: username,
      password: password
    }).then((data) => {

      if (data.data.success == true) {
        sessionStorage.setItem("token", JSON.stringify(data.data.token));
        sessionStorage.setItem("username", JSON.stringify(username));
        sessionStorage.setItem("useDetails", JSON.stringify(data.data.details));

        setBackdropOn(true)
        setTimeout(() => {
          setBackdropOn(false)
          navigate("/dashboard", { replace: true })
          window.location.reload()
        }, 2000);
      } else {
        // alertMessage = data?.data?.message
        setAlertMessage(data?.data?.message)
        setAlertOn(true);
        setAlertSeverity("error")

        setTimeout(() => {
          setAlertOn(false);
        }, 3000)
      }

    }).catch(error => console.log(error)
    )

  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ height: "100vh", }} >
        <CssBaseline />
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: { xs: "column", md: "row" } }}>
          <Box width={{ xs: '100%', md: '50%' }} height={{ xs: 'auto', md: '100vh' }} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <img src={logo} style={{
              width: '80%',
              maxWidth: '200px',
              height: 'auto'
            }} />
          </Box>
          <Box
            sx={{
              marginTop: { xs: 2, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: "center"
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder='Email'
                name="email"
                autoComplete="email"
                autoFocus
                label="Email"

                onChange={(e) => {
                  setUsername(e.target.value);

                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder='password'
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={LoginFunc}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <SimpleBackdrop open={backdropOn} close={setBackdropOn} />
        <AlertComponent open={alertOn} close={setAlertOn} message={alertMessage} severity={alertSeverity} />
      </Container>
    </ThemeProvider>
  );
}