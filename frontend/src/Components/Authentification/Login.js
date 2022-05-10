import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/actions/authActions";

function Login({ handleTabChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const paperStyle = { height: "73vh", width: 700 };
  const btnstyle = {
    marginTop: 150,
    marginLeft: 150,
    marginRight: 150,
    width: 400,
    position: "relative",
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <TextField
          style={{ width: "90%", padding: 3, marginTop: 80, marginLeft: 30 }}
          label="Email"
          placeholder="Enter your email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ width: "90%", padding: 3, marginTop: 25, marginLeft: 30 }}
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={values.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <Button variant="outlined" color="error">
                      Hide
                    </Button>
                  ) : (
                    <Button variant="outlined" color="success">
                      Show
                    </Button>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          style={{ width: "99%", padding: 3, marginTop: 10, marginLeft: 30 }}
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleLogin}
        >
          Sign in
        </Button>
        {/* <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography> */}
        <Typography
          style={{ width: "99%", padding: 3, marginTop: 10, marginLeft: 200 }}
        >
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleTabChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
