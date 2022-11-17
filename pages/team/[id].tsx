import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PlayerFoot,
  PlayerPosition,
} from "../../data-access/player/player.model";
import {
  GetAllPlayersByTeamQueryResponse,
  GET_ALL_PLAYERS_BY_TEAM_QUERY,
} from "../../data-access/player/player.queries";
import { GetTeamById, GET_TEAM_BY_ID_QUERY } from "../../data-access/team/team.queries";

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

  const { loading: teamLoading, error: teamError, data: teamData } =
    useQuery<GetTeamById>(
      GET_TEAM_BY_ID_QUERY,
      {
        variables: {
          teamId: query.id,
        },
      },
    );

  const { loading, error, data } =
    useQuery<GetAllPlayersByTeamQueryResponse>(
      GET_ALL_PLAYERS_BY_TEAM_QUERY,
      {
        variables: {
          teamId: query.id,
          ...(filter && selection ? { [filter]: selection } : {}),
        },
      }
    );

  if (teamLoading || loading) return <p>Loading...</p>;
  if (teamError || error) return <p>Error :</p>;

  return (
    <>
      <Link
        href="/"
        className="absolute left-5 top-2 p-2 font-qatar rounded bg-white hover:bg-gray-100 active:bg-gray-200"
        style={{color: teamData!.getTeamById.background}}
      >
        <ArrowLeftIcon className="h-8 mr-2"/>
        <span>Back</span>
      </Link>
      {/*
      <select {...register("filter")}>
        <legend>Choose a filter</legend>
        <option value="">None</option>
        <option value="positions"> Positions</option>
        <option value="foot">Foot</option>
      </select>
      */}
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
      <div className="h-screen" style={{backgroundColor: teamData!.getTeamById.background}}>
        <div className="flex flex-col items-center w-full mb-4 pt-4">
          <img className="border-4 border-[#FEC310] mb-4" src={teamData!.getTeamById.flag_icon} width="200" />
          <h1 className="font-qatar bg-white py-2 px-6 text-3xl" style={{color: teamData!.getTeamById.background}}>{teamData!.getTeamById.name}</h1>
        </div>
        <ul className="p-4 grid gap-4 lg:gap-5 xl:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <li className="bg-gradient-to-b from-orange-400 to-orange-600 h-96 font-qatar text-white text-base">
            <Link className="flex flex-col justify-end h-full" href="/player/create">
              <PlusIcon className="w-8/12 text-white block m-auto" />
              <span className="border-b-4 border-b-orange-700 text-orange-700 text-center text-xl uppercase bg-white py-1.5 mx-4">
                Add new
              </span>
              <span className="text-white px-0 text-sm mb-4">&nbsp;</span>
            </Link>
          </li>
          {data!.getAllPlayersByTeam.map(
            ({ id, name, team, position, birth, height, weight, foot }) => (
          <li key={id} className="bg-gradient-to-b from-orange-400 to-orange-600 flex flex-col justify-end h-96 font-qatar text-white text-base">
            <span className="p-4 grow bg-[url('/img/player.svg')] bg-cover bg-center bg-no-repeat grayscale flex flex-col justify-start">
              <span>h: {height} w: {weight}</span>
              <span>p: {position.join(',')}</span>
              <span>f: {foot}</span>
            </span>
            <span className="border-b-4 border-b-orange-700 text-orange-700 text-center text-xl uppercase bg-white py-1.5 mx-4">
              {name}
            </span>
            <span className="text-white bg-orange-700 self-center px-2 text-sm mb-4">{birth}</span>
          </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
