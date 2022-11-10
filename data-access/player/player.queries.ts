import { gql } from "@apollo/client";
import { Player } from "./player.model";

export const GET_ALL_PLAYERS_BY_TEAM_QUERY = gql`
query findAllPlayersByTeamComplete($teamId: ID) {
  getAllPlayersByTeam(teamId: $teamId) {
    id
    name
    team {
        name
    }
    birth
    height
    weight
  }
}
`;

export type GetAllPlayersByTeamQueryResponse = { getAllPlayersByTeam: Player[] };