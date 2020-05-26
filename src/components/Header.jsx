import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DNSLogo from "../images/dnslogo.png";

const Header = (props) => {
  return (
    <Grid columns={3} divided centered>
      <Grid.Row>
        <Grid.Column floated="left">
          <img src={DNSLogo} alt="DNSLogo" />
        </Grid.Column>
        <Grid.Column>
          <h1 id="header">Daily News Sense</h1>
        </Grid.Column>
        <Grid.Column floated="right" verticalAlign="bottom" width={3}>
          {!props.authenticated ? (
            <Link name="Login" to={{ pathname: "/sign_in" }}>
              <Button basic color="black" id="login">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <p>welcome {props.uid}</p>
              <Link name="Logout" to={{ pathname: "/logout" }}>
                <Button basic color="black" id="logout">
                  Logout
                </Button>
              </Link>
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default Header;
