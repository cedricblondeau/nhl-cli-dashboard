import axios from 'axios';
import moment from 'moment';

const getNHLAPIStandings = async () => {
  const response = await axios.get(
    'https://statsapi.web.nhl.com/api/v1/standings',
  );
  return response.data;
};

const getNHLAPIGames = async () => {
  const startDate = moment()
    .add(-7, 'days')
    .format('YYYY-MM-DD');
  const endDate = moment()
    .add(7, 'days')
    .format('YYYY-MM-DD');

  const response = await axios.get(
    `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${startDate}&endDate=${endDate}&expand=schedule.scoringplays,schedule.linescore`,
  );

  return response.data;
};

export { getNHLAPIGames, getNHLAPIStandings };
