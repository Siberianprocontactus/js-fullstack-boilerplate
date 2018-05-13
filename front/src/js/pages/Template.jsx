import React  from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Jumbotron,
  Button,
  Glyphicon,
}  from 'react-bootstrap';

import {
  loadTemplate,
} from '../actions/template.js';

class Template extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  login() {
    const {
      login,
    } = this.props;

    return login();
  }

  async logout() {
    const {
      logout,
      clearMe,
    } = this.props;

    await logout();
    await clearMe();
  }

  render() {
    const {
      template,
      loadTemplate,
    } = this.props;

    return (
      <Grid className="page page--template">
        <Row>
          <Col sm={6} xsOffset={3}>
            <Jumbotron>
              <h1><Glyphicon glyph="ok" /> Template page</h1>
              <p>Some template text</p>
              <p>{JSON.stringify(template, null, 2)}</p>
              <Button onClick={loadTemplate}>loadTemplate</Button>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
};

const mapStateToProps = ({
  template,
}) => ({
  template,
});

const mapDispatchToProps = {
  loadTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
