import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHandlers } from "formik";
import * as Yup from "yup";
import Container from "../../components/UI/Container/Container";
import Modal from "../../components/UI/Modal/Modal";
import Logo from "../../components/UI/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import { login } from "../../store/thunks";
import { useSelector } from "react-redux";
import authActions, { getAuth } from "../../store/slices/authSlice";
import { useEffect } from "react";
import logo from "../../assets/images/app/logo.png";
import { useRef } from "react";
import Input from "../../components/UI/Input/Input";
import { useAppDispatch } from "../../store/hooks";

interface FormikLoginFields {
  email: string;
  password: string;
}

const initialValues: FormikLoginFields = {
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
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "enter a password",
    type: "password",
  },
];

const Login = (): JSX.Element => {
  const { error: authError, sendingRequest } = useSelector(getAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.setError(null));
  }, [dispatch]);

  function submitHandler({ email, password }: FormikLoginFields) {
    dispatch(login({ email, password }));
  }

  return (
    <section>
      <Container>
        <div className="flex items-center justify-center flex-col h-screen">
          <div className="mb-16 flex flex-col text-center items-center">
            <Logo size="lg" />
            <h1 className="my-2 text-3xl font-bold ">Friends Feed</h1>
            <p>
              Login to your account to see your friends posts and share your own
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            <Form className="sm:w-96 max-sm:w-full">
              {formInputs.map((input) => (
                <Input
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  type={input.type}
                  className="mb-3 w-full"
                  full
                />
              ))}

              {authError && (
                <p
                  className="
              text-red-500
                text-sm
              "
                >
                  {authError}
                </p>
              )}

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
