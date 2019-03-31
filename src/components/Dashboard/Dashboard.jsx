import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dashboard extends Component {

  render() {
    const matchNavHeight = 6;

    return (
      <element>
        <element height={matchNavHeight} top={0}>
        </element>
        <line
          top={matchNavHeight + 1}
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element width="100%" height="100%-20" top={matchNavHeight + 2}>
        </element>
        <line
          top="100%-11"
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element width="100%" height={10} top="100%-10">
        </element>
      </element>
    );
  }
}

Dashboard.propTypes = {
  addKeypressListener: PropTypes.func.isRequired,
  debug: PropTypes.func.isRequired,
};

export default Dashboard;
