import React, {useState} from "react";
import { Grid, Button, Form, Input } from "semantic-ui-react";

const LoginForm = (props) => {
  const [message, setMessage] = useState("")
  
  const login = async (e) =>{
    const response = await auth.signIn(
      e.target.email.value,
      e.target.password.value
    )
    response.success && (props.setUid(response.data.uid))
  }
  return (
    <Grid className="login-container" verticalAlign="middle">
      <Grid.Column align="center">
        <Form id="login-form" onSubmit={login}>
          <h1>Log in</h1>
          <h4>Email</h4>
          <Input name="email" type="email" id="email"></Input>
          <h4>Password</h4>
          <Input name="password" type="password" id="password"></Input>
          <Button id="submit">Submit</Button>
          {/* <p id="error-message">{message}</p> */}
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
