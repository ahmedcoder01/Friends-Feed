import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/UI/Input/Input";
import Container from "../../components/UI/Container/Container";
import Modal from "../../components/UI/Modal/Modal";
import Logo from "../../components/UI/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import { login } from "../../store/thunks";
import { useSelector, useDispatch } from "react-redux";
import authActions, { getAuth } from "../../store/slices/authSlice";
import { useEffect } from "react";
import logo from "../../assets/images/app/logo.png";
import { useRef } from "react";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
});

const formInputs = [
  {
    name: "email",
    label: "Email",
    placeholder: "example@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "enter a password",
  },
];

const Login = () => {
  const { error: authError, sendingRequest } = useSelector(getAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.setError(null));
  }, [dispatch]);

  function submitHandler({ email, password }) {
    dispatch(login(email, password));
  }

  return (
    <section>
      <Container>
        <div className="flex items-center justify-center flex-col h-screen">
          <Logo size="lg" />
          <p className="my-2">Login to manage your account</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            <Form>
              {formInputs.map((input) => (
                <Input
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  className="mb-3"
                  full
                />
              ))}

              {authError && <p className="">{authError}</p>}

              <Button
                full
                type="submit"
                className="mt-5"
                loading={sendingRequest}
              >
                Log In
              </Button>

              <p className="mt-2 text-center">
                Don't have an account yet? <Link to="/signup">Signup</Link>
              </p>
            </Form>
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default Login;
