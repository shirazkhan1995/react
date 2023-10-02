import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
// import { act } from 'react-dom/test-utils';

const emailReducer = (state, action) =>{
  if(action.type === 'USER_INPUT'){
    return{value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value : state.value, isValid: state.value.includes('@')};
  }
  return {value:'', isValid: false}

  
}

const passwordReducer = (state, action) =>{
  if(action.type === 'PASSWORD_INPUT'){
    return{value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value : state.value, isValid: state.value.trim().length > 6};
  }
  return {value:'', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState, dispatchEmail] = useReducer(emailReducer, {value : '', isValid: false});
  const[passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: false});
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      props.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){

    }else{
      
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="E-mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input id="password" label="password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
