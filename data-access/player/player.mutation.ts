import { gql } from "@apollo/client";

export const CREATE_PLAYER_MUTATION = gql`
  mutation addPlayer($name: String, $teamId: String, $position: [PlayerPosition], $birth: String, $height: Float, $weight: Float, $foot: PlayerFoot) {
    createPlayer(name: $name, teamId: $teamId, position: $position, birth: $birth, height: $height, weight: $weight, foot: $foot) {
      id
      name
    }
  }
`;
