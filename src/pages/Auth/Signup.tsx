import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "../../components/UI/Container/Container";
import Modal from "../../components/UI/Modal/Modal";
import Logo from "../../components/UI/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import { signup } from "../../store/thunks";
import { useSelector } from "react-redux";
import authActions, { getAuth } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
import Input from "../../components/UI/Input/Input";

interface FormikSignupFields {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  bio: string;
}

const initialValues: FormikSignupFields = {
  name: "",
  email: "",
  password: "",
  bio: "",
};
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, "name must be at least 3 characters long"),
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .matches(/[A-Z]+/, "password must include an uppercase character")
    .matches(/[0-9]+/, "password must contain numbers")
    .min(8, "password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password")], "passwords do not match"),
  bio: Yup.string().required("bio is required"),
});

const formInputs = [
  {
    name: "name",
    label: "Name",
    placeholder: "John Doe",
  },
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
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "confirm password",
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "tell us about yourself",
  },
];

const Signup = (): JSX.Element => {
  const { error: authError, sendingRequest } = useSelector(getAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.setError(null));
  }, [dispatch]);

  function submitHandler(values: FormikSignupFields) {
    const { confirmPassword, ...signupCred } = values;
    dispatch(signup(signupCred));
  }

  return (
    <section className="">
      <Container className="">
        <div className="flex items-center justify-center flex-col h-screen">
          <Logo size="lg" className="" />
          <p className="">Sign Up to connect</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            <Form className="sm:w-96">
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

              {authError && <p className=""></p>}

              <Button
                full
                type="submit"
                className="mt-5"
                loading={sendingRequest}
              >
                Sign Up
              </Button>

              <p className="mt-2 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
