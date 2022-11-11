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

export const GET_ALL_PLAYERS_BY_TEAM_WITH_PARAMETERS_QUERY = gql`
query findAllPlayersByTeamAndParametersComplete($teamId: ID, $foot: PlayerFoot, $positions:[PlayerPosition] ) {
  getAllPlayersByTeamWithParameters(teamId:$teamId, foot:$foot, positions:$positions) {
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
export type GetAllPlayersByTeamWithParametersQueryResponse = { getAllPlayersByTeamWithParameters: Player[] };