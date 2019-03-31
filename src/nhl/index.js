import { getNHLAPIGames, getNHLAPIStandings } from './nhl_api';
import {
  NHLAPIGameToMatch,
  NHLAPIDivisionTeamRecordToStanding,
} from './nhl_api_mappings';

const getMatches = async () => {
  const data = await getNHLAPIGames();

  const mappedMatches = data.dates.reduce(
    (matches, date) =>
      matches.concat(date.games.map(game => NHLAPIGameToMatch(game))),
    [],
  );

  return {
    completedAndLiveMatches: mappedMatches
      .filter(match => match.status === 'COMPLETED' || match.status === 'LIVE')
      .reverse(),
    scheduledMatches: mappedMatches.filter(
      match => match.status === 'SCHEDULED',
    ),
  };
};

const getDivisionStandings = async () => {
  const data = await getNHLAPIStandings();

  return data.records.map(divisionRecord => {
    const standings = divisionRecord.teamRecords.map(teamRecord =>
      NHLAPIDivisionTeamRecordToStanding(teamRecord),
    );

    return {
      id: divisionRecord.division.id,
      name: divisionRecord.division.name,
      standings,
    };
  });
};

export { getMatches, getDivisionStandings };
