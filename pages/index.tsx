import { useQuery } from '@apollo/client';
import { GET_ALL_TEAMS_QUERY } from '../data-access/team/team.queries';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getAllTeams.map(({ id, name, background, flag_icon }) => (
    <div key={id}>
     <div className={background}>
      <img src={flag_icon} />
      <a href={`/team/${id}`}> { name } </a>
     </div> 
      <br />
    </div>
  ));
}
