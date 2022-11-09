import { gql } from "@apollo/client";

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