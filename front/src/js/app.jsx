import React  from 'react';
import { connect } from 'react-redux';
import { 
  Grid,
  Row,
}  from 'react-bootstrap';

import Header from './components/Header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('app mounted');
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className="app">
        <Header className="app__header" />
        <Grid fluid className="app__content content">
          <Row className="content__container">
           {children}
          </Row>
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = ({
}) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
