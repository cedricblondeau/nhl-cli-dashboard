import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getDivisionStandings, getMatches } from '../../nhl';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMatchIndex: 0,
      matches: null,
      standings: null,
    };
  }

  componentDidMount() {
    this.updateMatches();
    this.updateStandings();

    setInterval(() => this.updateMatches(), 1 * 60 * 1000);

    const { addKeypressListener } = this.props;

    addKeypressListener('left', () => {
      const { matches, selectedMatchIndex } = this.state;

      if (!matches) {
        return;
      }

      if (selectedMatchIndex <= 0) {
        return;
      }

      this.setState(prevState => ({
        selectedMatchIndex: prevState.selectedMatchIndex - 1,
      }));
    });

    addKeypressListener('right', () => {
      const { matches, selectedMatchIndex } = this.state;

      if (!matches) {
        return;
      }

      const navMatchesCount = matches.completedAndLiveMatches.length;
      if (selectedMatchIndex >= navMatchesCount - 1) {
        return;
      }

      this.setState(prevState => ({
        selectedMatchIndex: prevState.selectedMatchIndex + 1,
      }));
    });
  }

  async updateMatches() {
    try {
      const matches = await getMatches();
      this.setState({ matches });
    } catch (e) {
      const { debug } = this.props;
      debug(`Matches - ${e.message}`);
    }
  }

  async updateStandings() {
    try {
      const standings = await getDivisionStandings();
      this.setState({ standings });
    } catch (e) {
      const { debug } = this.props;
      debug(`Standings - ${e.message}`);
    }
  }

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
