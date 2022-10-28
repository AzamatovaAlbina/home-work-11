import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const userFormReducer = (state, action) => {
  console.log(action.val);
  console.log(state);
  if (action.type === "INPUT_EMAIL") {
    return {
      userEmail: action.val,
      userEmailValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_EMAIL_BLUR") {
    return {
      userEmail: state.userEmail,
      userEmailValid: state.userEmail.includes("@"),
    };
  }
  if (action.type === "INPUT_PASSWORD") {
    return {
      userPassword: action.val,
      userPasswordValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_PASSWORD_BLUR") {
    return {
      userPassword: state.userPassword,
      userPasswordValid: state.userPassword,
    };
  }
  return state;
};

const initialUserForm = {
  userEmail: "",
  userEmailValid: undefined,
  userPassword: "",
  userPasswordValid: undefined,
};

const Login = (props) => {
  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer,
    initialUserForm
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const { userEmailValid, userPasswordValid } = userForm;
  console.log(userForm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        userForm.userEmail.includes("@") &&
          userForm.userPassword.trim().length > 6
      );
    }, 1500); //

    return () => {
      console.log("clean up");
      clearTimeout(timer);
    };
  }, [userEmailValid, userPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatchUserForm({ type: "INPUT_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchUserForm({ type: "INPUT_PASSWORD", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchUserForm({ type: "INPUT_EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchUserForm({ type: "INPUT_PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(userForm.userEmail, userForm.userPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            userForm.userEmail === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email" className={classes.title}>
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={userForm.userEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            userForm.userPassword === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userForm.userPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
