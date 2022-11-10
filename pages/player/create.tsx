import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Player, PlayerFoot, PlayerPosition } from "../../data-access/player/player.model";
import { CREATE_PLAYER_MUTATION } from "../../data-access/player/player.mutation";
import { GetAllTeamsBasicQueryResponse, GET_ALL_TEAMS_BASIC_QUERY } from "../../data-access/team/team.queries";

export default function CreatePlayer() {
  const { register, handleSubmit, reset } = useForm<Player>();

  const { loading: loadingTeams, error: errorTeams, data: dataTeams } = useQuery<GetAllTeamsBasicQueryResponse>(GET_ALL_TEAMS_BASIC_QUERY);

  const [createPlayer, { data, loading, error }] =
    useMutation(CREATE_PLAYER_MUTATION);

  const onSubmit = ({ name, teamId, position, birth, height, weight, foot }: Player) => {
    createPlayer({
      variables: {
        name,
        teamId,
        position,
        birth: birth.toString(),
        height: +height,
        weight: +weight,
        foot
      },
    });
    reset({
      name: "",
      teamId,
      position,
      birth,
      height,
      weight,
      foot
    });
  };
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input type="text" {...register("name")} />
        </label>
        <label>
          Team
          <select {...register("teamId")}>
            {dataTeams?.getAllTeams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
        </label>
        <label>
          Positions
          <select {...register("position")} multiple>
            {Object.keys(PlayerPosition).map(playerPosition => <option key={playerPosition} value={playerPosition}>{playerPosition}</option>)}
          </select>
        </label>
        <label>
          birth
          <input type="date" {...register("birth")} />
        </label>
        <label>
          Height
          <input type="number" {...register("height")} />
        </label>
        <label>
          Weight
          <input type="number" {...register("weight")} />
        </label>
        <label>
          Foot
          <select {...register("foot")}>
            {Object.keys(PlayerFoot).map(playerFoot => <option key={playerFoot} value={playerFoot}>{playerFoot}</option>)}
          </select>
        </label>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
}
