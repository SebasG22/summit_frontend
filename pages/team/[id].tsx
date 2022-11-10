import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GetAllPlayersByTeamQueryResponse, GET_ALL_PLAYERS_BY_TEAM_QUERY } from "../../data-access/player/player.queries";

export default function TeamDetails() {

  const { query } = useRouter();

  const { loading, error, data } = useQuery<GetAllPlayersByTeamQueryResponse>(GET_ALL_PLAYERS_BY_TEAM_QUERY, {
    variables: {
      teamId: query.id,
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return <>
    <ul>

      {data!.getAllPlayersByTeam.map(({ id,
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