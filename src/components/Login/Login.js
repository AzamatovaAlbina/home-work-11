import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// const emailReducer = (state, action) => {
//   if (action.type === "INPUT_EMAIL") {
//     return {
//       emailValue: action.val,
//       isValid: action.val.includes("@"),
//     };
//   }
//   if (action.type === "INPUT_EMAIL_BLUR") {
//     return {
//       emailValue: state.emailValue,
//       isValid: state.emailValue.includes("@"),
//     };
//   }
//   return state;
// };

// const initialState = {
//   emailValue: "",
//   isValid: undefined,
// };

// const passwordReducer = (state, action) => {
//   console.log(state, 'state');
//   console.log(action, 'action');
//   if (action.type === "INPUT_PASSWORD") {
//     return {
//       passwordValue: action.val,
//       isPasswordValue: action.val.trim().length > 6,
//     };
//   }
//   if (action.type === "INPUT_PASSWORD_BLUR") {
//     console.log('input-password-blur working');
//     return {
//       passwordValue: state.passwordValue,
//       isPasswordValue: state.passwordValue.trim().length > 6,
//     };
//   }
//   return state;
// };

// const initialPasswordState = {
//   passwordValue: "",
//   isPasswordValue: undefined,
// };

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
  return state
};

const initialUserForm = {
  userEmail: "",
  userEmailValid: undefined,
  userPassword: "",
  userPasswordValid: undefined,
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  // const [passwordState, dispatchPassword] = useReducer(
  //   passwordReducer,
  //   initialPasswordState
  // );

  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer,
    initialUserForm
  );

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // const { isValid: emailIsValid } = emailState;
  // const { isPasswordValue: isPwdValue } = passwordState;

  const { userEmailValid, userPasswordValid } = userForm;
  console.log(userForm);

  useEffect(() => {
    // useEffect hook
    const timer = setTimeout(() => {
      setFormIsValid(
        userForm.userEmail.includes("@") &&
          userForm.userPassword.trim().length > 6 // user жазган email де @ белгиси жок болсо  false  болот && password узундугу 6 дан чон болсо
      );
    }, 1500); //

    return () => {
      //  clean up function
      console.log("clean up");
      clearTimeout(timer);
    };
  }, [userEmailValid, userPasswordValid]); //

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
    // props.onLogin(emailState.emailValue, passwordState.passwordValue);
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
