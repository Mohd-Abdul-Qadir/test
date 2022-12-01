import { Avatar, Grid, Paper, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import React,{useState} from 'react'
import Link from '@mui/material/Link';
import { useHistory } from 'react-router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Login({handleChange}) {
    const history = useHistory();
    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_PROXY+'/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })

        });
        const data =await res.json();
        console.log(data)
        if (!data.isSuccess){
            window.alert("Invaaid id and password");
        }else{
            localStorage.user = JSON.stringify(data.data.userLogin);
            localStorage.token = data.data.token;
            
    //         <Stack sx={{ width: '100%' }} spacing={2}>
      
    //   <Alert variant="filled" severity="success">
    //      successful Login !
    //   </Alert>
    // </Stack>
            
            history.push("/")
            window.location.reload()
        }

        
    }

    const paperStyle={padding:20,height:'70vh', width:348, margin:"20px auto" }
    const avtarstyle={backgroundColor:'#1bbd7e'}
    const btnstyle = {margin:'8px 0'}
    return (
        <Grid style={{marginTop:50, margin:-19}}>
            <Paper  style={paperStyle}>
                <Grid align="center">
                   <Avatar style={avtarstyle}><LockOutlinedIcon/></Avatar>
                      <h2>Login</h2>

                </Grid>
                 
                <form method="POST" >
                      <TextField
                        label="Enter Id"
                        variant="standard"
                        name="email"  
                        fullWidth required
                        autocomplete="off"  
                        // method="POST" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                      <TextField
                        label="Password" 
                        variant="standard" 
                        name="password" 
                        type='password' 
                        autocomplete="off"
                        fullWidth required
                        // method="POST" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)} 
                        />
                        </form>
                      <FormControlLabel control={<Checkbox/>} label="Remember me" />
                      <Button variant="contained" style={btnstyle} onClick={loginUser} fullWidth>Login</Button>
                      <Typography> 
                          <Link href="#">Forgot password</Link>
                      </Typography>
                      <Typography> Do you have an account ?
                          <Link href="#" onClick={()=>handleChange("event",1)}>
                              Sing Up
                              </Link>
                      </Typography>




            </Paper>
        </Grid>
    )
}

export default Login
