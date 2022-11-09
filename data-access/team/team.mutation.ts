import { gql } from "@apollo/client";

export const CREATE_TEAM_MUTATION = gql`
  mutation addTeam($name: String, $flag_icon: String, $background: String) {
    createTeam(name: $name, flag_icon: $flag_icon, background: $background) {
      id
      name
    }
  }
`;
