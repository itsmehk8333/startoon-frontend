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
import { useForm } from 'react-hook-form';
import instance from './Auth/Auth';
import { useNavigate } from 'react-router';
import SimpleBackdrop from './Backdrop';
import AlertComponent from './Alerts';
import logo from "../Utilities/logo.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'gray', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue', // Border color when focused
    },
    '&.Mui-error fieldset': {
      borderColor: 'red', // Border color when there's an error
    },
  },
  '& label.Mui-error': {
    color: 'red', // Label color when there's an error
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: 'red', // Helper text color when there's an error
  },
}));

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [backdropOn, setBackdropOn] = React.useState(false)
  const [alertOn, setAlertOn] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("")
  const navigate = useNavigate();

  // const[firstName , setFirstName] = React.useState("");
  // const[lastName , setLastName] = React.useState("");
  // const[userEmail , setEmail] = React.useState("");
  // const[password , setPassword] = React.useState("");
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };


  function registerUser(data) {

    console.log(data)
    setBackdropOn(true)

    const userData = {
      emailId: data.username,
      password: data.password,
      gender: data.gender,
      name: data.firstname
    }
    console.log(userData)
    instance.post("/auth/signup", JSON.stringify(userData)).then((data) => {

      if (data.data.success == true) {
        setAlertOn(true);
        setAlertMessage("User Registration Successfull!!");
        setAlertSeverity("success")
        setTimeout(() => {
          setBackdropOn(false)
          navigate("/login")

        }, 1000)
      }
      else {
        console.log(78)
        setAlertOn(true);
        setAlertMessage(data.data.message);
        setBackdropOn(false);
        setAlertSeverity("error")
        setTimeout(() => {
          setAlertOn(false);
        }, 3000)
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ height: "100vh", }} >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: "center",
            justifyContent: "center",
            height: '100vh',
          }}
        >
          <Box width={{ xs: '100%', md: '50%' }} height={{ xs: 'auto', md: '100vh' }} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <img src={logo} style={{
              width: '80%',
              maxWidth: '200px',
              height: 'auto',
            }} />
          </Box>
          <Box
            sx={{
              marginTop: { xs: 2, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: "center",
              width: { xs: '100%', md: '50%' }
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    {...register("firstname", { required: true })}
                  // onChange={(e)=>{setFirstName(e.target.value)}}

                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    {...register("username", {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email',
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}

                  // onChange={(e)=>{setEmail(e.target.value)}}

                  /> */}

                  <CustomTextField
                    fullWidth
                    id="Username"
                    label="Email"
                    name="email"
                    variant="outlined"
                    {...register('username', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", { required: true })}

                  // onChange={(e)=>{setPassword(e.target.value)}}

                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio  {...register("gender", { required: true })} />} label="Female" />
                      <FormControlLabel value="male" control={<Radio  {...register("gender", { required: true })} />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(registerUser)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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