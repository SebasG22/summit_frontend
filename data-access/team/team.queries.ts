import { gql } from "@apollo/client";
import { Team, TeamBasic } from "./team.model";

export const GET_ALL_TEAMS_QUERY = gql`
query findAllTeamsComplete {
  getAllTeams{
    id
    name
    flag_icon
    background
  }
}
`;

export type GetAlTeamsQueryResponse = { getAllTeams: Team[] };

export const GET_ALL_TEAMS_BASIC_QUERY = gql`
query findAllTeamsBasic {
  getAllTeams{
    id
    name
  }
}
`;

export type GetAllTeamsBasicQueryResponse = { getAllTeams: TeamBasic[] };

export const GET_TEAM_BY_ID_QUERY = gql`
query findTeamById($teamId: ID) {
  getTeamById(teamId: $teamId) {
    name
    flag_icon
    background
  }
}
`;

export type GetTeamById = { getTeamById: Team };
