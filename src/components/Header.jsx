import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Grid columns={3} divided centered>
      <Grid.Row>
        <Grid.Column floated="left">
          {/* <img src="..public/images/dnslogo.png" alt="DNSLogo" /> */}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column verticalAlign="middle">
          <h1 id="header">Daily News Sense</h1>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column floated="right" width={3}>
          <Link name="Login" to={{ pathname: "/sign_in" }}>
            <Button basic color="black" id="login" />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default Header;
