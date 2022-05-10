import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../Redux/actions/authActions";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [profilpic, setProfilpic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Input = styled("input")({
    display: "none",
  });
  const paperStyle = { height: "73vh", width: 700 };
  const btnstyle = {
    marginTop: 30,
    marginLeft: 150,
    marginRight: 150,
    width: 400,
  };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    showCPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowCPassword = () => {
    setValues({
      ...values,
      showCPassword: !values.showCPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      register({ username, email, password, gender, profilpic }, navigate)
    );
  };

  const uploadingImage = (pic) => {
    setPicLoading(true);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "chatapp");

    fetch("https://api.cloudinary.com/v1_1/mernchatapp/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfilpic(data.url.toString());
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoading(false);
      });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center" marginTop={3} marginBottom={3}>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            style={{ width: "90%", padding: 3, marginTop: 5, marginLeft: 30 }}
            fullWidth
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <TextField
            style={{ width: "90%", padding: 3, marginTop: 20, marginLeft: 30 }}
            fullWidth
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <FormControl
            component="fieldset"
            style={{ width: "99%", padding: 3, marginTop: 25, marginLeft: 30 }}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              style={{ display: "initial" }}
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <TextField
            style={{ width: "90%", padding: 3, marginTop: 20, marginLeft: 30 }}
            fullWidth
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
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
          <TextField
            style={{ width: "90%", padding: 3, marginTop: 20, marginLeft: 30 }}
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            type={values.showCPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showCPassword ? (
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
          <label
            htmlFor="contained-button-file"
            style={{ width: "90%", padding: 3, marginLeft: 30 }}
          >
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => uploadingImage(e.target.files[0])}
            />
            {console.log(profilpic)}
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 20 }}
            >
              Upload your picture
            </Button>
          </label>

          <FormControlLabel
            style={{ width: "99%", padding: 3, marginTop: 20, marginLeft: 20 }}
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            style={btnstyle}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Register;
