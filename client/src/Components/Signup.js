import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    age: yup.number().required("Please enter an age."),
    email: yup.string().email("Invalid email").required("required."),
    password: yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      age: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const fetchData = async () => {
        const resp = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (resp.ok) {
          const user = await resp.json();
          console.log(user);
        }
      };
      navigate("/");
      fetchData();
    },
  });

  return (
    <>
      <Container maxWidth="xs">
        <Box>
          <Typography>Sign up</Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="user"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <Typography sx={{ color: "red" }}>
                  {formik.errors.username}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  autoComplete="age"
                />
                <Typography sx={{ color: "red" }}>
                  {formik.errors.age}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoComplete="email"
                />
                <Typography sx={{ color: "red" }}>
                  {formik.errors.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  autoComplete="password"
                />
                <Typography sx={{ color: "red" }}>
                  {formik.errors.password}
                </Typography>
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  label="Avatar"
                  name="avatar"
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                  autoComplete="avatar"
                />
                <Typography sx={{ color: "red" }}>
                  {formik.errors.avatar}
                </Typography>
              </Grid> */}
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-left" sx={{ mb: 8 }}>
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
