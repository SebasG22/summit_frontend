import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PlayerFoot,
  PlayerPosition,
} from "../../data-access/player/player.model";
import {
  GetAllPlayersByTeamWithParametersQueryResponse,
  GET_ALL_PLAYERS_BY_TEAM_WITH_PARAMETERS_QUERY,
} from "../../data-access/player/player.queries";

export default function TeamDetails() {
  const { register, handleSubmit, reset, watch, setValue } = useForm<{
    filter: string;
    selection: string;
  }>();
  const { query } = useRouter();
  const { filter, selection } = watch();

  useEffect(() => {
    setValue("selection", "");
  }, [filter]);

  const { loading, error, data } =
    useQuery<GetAllPlayersByTeamWithParametersQueryResponse>(
      GET_ALL_PLAYERS_BY_TEAM_WITH_PARAMETERS_QUERY,
      {
        variables: {
          teamId: query.id,
          ...(filter && selection ? { [filter]: selection } : {}),
        },
      }
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <select {...register("filter")}>
        <legend>Choose a filter</legend>
        <option value="">None</option>
        <option value="positions"> Positions</option>
        <option value="foot">Foot</option>
      </select>
      {filter && (
        <select multiple={filter === "positions"} {...register("selection")}>
          {Object.keys(
            filter === "positions" ? PlayerPosition : PlayerFoot
          ).map((playerOption) => (
            <option key={playerOption} value={playerOption}>
              {playerOption}
            </option>
          ))}
        </select>
      )}
      <ul>
        {data!.getAllPlayersByTeamWithParameters.map(
          ({ id, name, team, position, birth, height, weight, foot }) => (
            <li>{name}</li>
          )
        )}
      </ul>
    </>
  );
}
