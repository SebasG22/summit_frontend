import { gql } from "@apollo/client";

export const GET_ALL_PLAYERS_QUERY = gql`
query findAllPlayersComplete {
  getAllPlayers{
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