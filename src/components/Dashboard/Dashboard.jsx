import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  MatchDetails,
  MatchNav,
  Standings,
} from 'sports-react-blessed-components';
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

  get matchNav() {
    const { matches, selectedMatchIndex } = this.state;
    if (!matches) {
      return <box content="Loading..." />;
    }

    return (
      <element>
        <element height={2} top={1}>
          <MatchNav
            matches={matches.completedAndLiveMatches}
            selectedMatchIndex={selectedMatchIndex}
          />
        </element>
        <element height={2} top={4}>
          <MatchNav matches={matches.scheduledMatches} />
        </element>
      </element>
    );
  }

  get matchDetails() {
    const { matches } = this.state;
    if (!matches) {
      return <box content="Loading..." />;
    }

    const { selectedMatchIndex } = this.state;
    const currentMatch = matches.completedAndLiveMatches[selectedMatchIndex];

    if (!currentMatch) {
      return null;
    }

    return <MatchDetails match={currentMatch} />;
  }

  get standings() {
    const { standings } = this.state;
    if (!standings) {
      return <box content="Loading..." />;
    }

    const divisionStandingsWidth = 18;

    const divisionStandings = standings.map((division, i) => (
      <element
        key={`division-standings-container-${division.id}`}
        width={divisionStandingsWidth}
        left={i * divisionStandingsWidth}
      >
        <Standings name={division.name} standings={division.standings} />
      </element>
    ));

    return (
      <box left="center" width={divisionStandingsWidth * 4}>
        {divisionStandings}
      </box>
    );
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
          {this.matchNav}
        </element>
        <line
          top={matchNavHeight + 1}
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element width="100%" height="100%-20" top={matchNavHeight + 2}>
          {this.matchDetails}
        </element>
        <line
          top="100%-11"
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element width="100%" height={10} top="100%-10">
          {this.standings}
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
