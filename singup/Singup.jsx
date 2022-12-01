import React , {useState} from 'react'
import { Avatar, Grid, Paper, TextField, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import validator from 'validator'
import { useHistory } from 'react-router';






function Singup() {
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorConfirmPassword,setErrorConfirmPassword] = useState(false);
    const [user, setUser]= useState({
        name:"",email:"",phone:"",password:"" , cpassword:""
    });
    let name,value;
    const history = useHistory();

    const handleInputs = (e) =>{
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        if(name == 'password') {
            if(!validate(value)) {
                setErrorMessage(true)
            } else {
                setErrorMessage(false);
            }
        }
        if(name == 'cpassword') {
            if(user.password != value) {
                setErrorConfirmPassword(true)
            } else {
                setErrorConfirmPassword(false)
            }
        }
        setUser({...user, [name]:value})
    }

    

    const postData = async (e)=>{
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;
        const res = await fetch(process.env.REACT_APP_PROXY+'/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword

            })
        });
        const data =await res.json();
        if(!data.isSuccess){
            window.alert("INvallid Registration")
            console.log("INvallid Registration")
            
        }else{
            window.alert("sucsussful Registration")
            // history.push("/login")


        }
    
    }
    const validate = (value) => {
  
        if (validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
          return true;
        } 
        return false;
      }
      

    const paperStyle={padding:20,height:'70vh', width:348, margin:"20px auto" }
    const avtarstyle={backgroundColor:'#1bbd7e'}
    const btnstyle = {margin:'8px 0'}
    return (
        <Grid style={{marginTop:50 , margin:-19}}>
        <Paper  style={paperStyle}>
            <Grid align="center">
               <Avatar style={avtarstyle}><AccountCircleOutlinedIcon/></Avatar>
                  <h2 style={{margin:0}}>Sing UP</h2>
                  <Typography variant='caption' >Plese fill this form to create an acount !</Typography>

            </Grid>
                 
                  <form method="POST">
                <TextField  
                  label="Name"
                  id = "name"
                  variant="standard"
                  name="name"
                  fullWidth required 
                  value={user.name}
                  onChange= {handleInputs}
                  />
                  <TextField 
                   label="Email"
                    variant="standard"
                    name="email" 
                    fullWidth required 
                    value={user.email}
                  onChange= {handleInputs}
                  />
                  
                  
            <FormControl component="fieldset">
             <FormLabel 
             component="legend" 
             style={{marginTop:8}}>
                 Gender
                 </FormLabel>
                 
              <RadioGroup 
                row aria-label="gender"
                name="row-radio-buttons-group" 
                 style={{marginTop:-5}}
                 >

                  <FormControlLabel 
                   value="female" 
                   control={<Radio />} 
                   label="Female" />
    
    <FormControlLabel
     value="male" 
     control={<Radio />} 
     label="Male" 
     />
       </RadioGroup>
</FormControl>
                 <TextField  
                 label="Phone" 
                 variant="standard" 
                 fullWidth required 
                 name="phone"
                 value = {user.phone}
                 onChange= {handleInputs}

                 />
                  <TextField  
                  label="Password" 
                  variant="standard"  
                  type='password'
                  name="password" 
                  fullWidth required
                  error={errorMessage}
                  helperText={errorMessage ? "Password must contain 1 Uppercase, 1 Special, 1 Lowercase, 1 number and minimum of 8 length":''}
                  value={user.password}
                  onChange= {handleInputs} 
                  />
                  <TextField  
                  label="Conform Password" 
                  variant="standard"  
                  type='password'
                  name="cpassword"
                  error={errorConfirmPassword}
                  value={user.cpassword}
                  helperText={errorConfirmPassword ?  "Password do not match":''}
                  onChange= {handleInputs} 
                  fullWidth required 
                  />

                  <Button variant="contained" style={btnstyle}  onClick={postData}>Sing up</Button>
                  
                  </form>
                 




        </Paper>
    </Grid>
    )
}

export default Singup
