import { useQuery } from "@apollo/client";
import { GET_ALL_PLAYERS_QUERY } from "../../data-access/player/player.queries";

export default function TeamDetails(){
const { loading, error, data } = useQuery(GET_ALL_PLAYERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <>
  <ul>

  {data.getAllPlayers.map(({ id,
    name,
    team,
    position,
    birth,
    height,
    weight,
    foot }) => (
        
        <li>{name}</li>
    
  ))}
  </ul>
  </>

}