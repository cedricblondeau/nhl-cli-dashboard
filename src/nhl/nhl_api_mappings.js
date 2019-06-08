import chalk from 'chalk';

import teams from './teams';

const getTeamCode = (id, name) => {
  if (Object.prototype.hasOwnProperty.call(teams, id.toString())) {
    return teams[id.toString()].code;
  }

  return name.substring(0, 3).toUpperCase();
};

const getTeamColor = id => {
  if (Object.prototype.hasOwnProperty.call(teams, id.toString())) {
    return teams[id.toString()].color;
  }

  return 'gray';
};

const NHLAPIGameToMatch = game => {
  const statusMap = new Map([
    ['Live', 'LIVE'],
    ['Preview', 'SCHEDULED'],
    ['Final', 'COMPLETED'],
  ]);

  const scoringPlaysToEventsForTeamId = (scoringPlays, teamId) => {
    return scoringPlays
      .filter(scoringPlay => scoringPlay.team.id === teamId)
      .map(scoringPlay => {
        return {
          type: chalk.black.bgWhite(scoringPlay.result.event),
          time: `${scoringPlay.about.ordinalNum} ${scoringPlay.about.periodTime}`,
          text: '',
        };
      });
  };

  const lineScoreToCurrentTime = lineScore => {
    if (
      !lineScore.currentPeriodOrdinal ||
      !lineScore.currentPeriodTimeRemaining
    ) {
      return '';
    }

    return `${lineScore.currentPeriodOrdinal} - ${lineScore.currentPeriodTimeRemaining}`;
  };

  return {
    id: game.gamePk.toString(),
    venue: game.venue.name,
    time: lineScoreToCurrentTime(game.linescore),
    datetime: game.gameDate,
    status: statusMap.has(game.status.abstractGameState)
      ? statusMap.get(game.status.abstractGameState)
      : 'SCHEDULED',
    winner_code: '',
    right_team: {
      code: getTeamCode(game.teams.home.team.id, game.teams.home.team.name),
      name: game.teams.home.team.name,
      color: getTeamColor(game.teams.home.team.id),
      score: game.teams.home.score,
      events: scoringPlaysToEventsForTeamId(
        game.scoringPlays,
        game.teams.home.team.id,
      ),
    },
    left_team: {
      code: getTeamCode(game.teams.away.team.id, game.teams.away.team.name),
      name: game.teams.away.team.name,
      color: getTeamColor(game.teams.away.team.id),
      score: game.teams.away.score,
      events: scoringPlaysToEventsForTeamId(
        game.scoringPlays,
        game.teams.away.team.id,
      ),
    },
  };
};

const NHLAPIDivisionTeamRecordToStanding = teamRecord => {
  const getStandingPoints = (points, clinchIndicator) => {
    if (!clinchIndicator) {
      return points.toString();
    }

    return `${points} (${clinchIndicator})`;
  };

  return {
    name: getTeamCode(teamRecord.team.id, teamRecord.team.name),
    color: getTeamColor(teamRecord.team.id),
    points: getStandingPoints(teamRecord.points, teamRecord.clinchIndicator),
  };
};

export { NHLAPIGameToMatch, NHLAPIDivisionTeamRecordToStanding };
