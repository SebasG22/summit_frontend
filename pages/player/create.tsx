import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Player,
  PlayerFoot,
  PlayerPosition,
} from "../../data-access/player/player.model";
import { CREATE_PLAYER_MUTATION } from "../../data-access/player/player.mutation";
import {
  GetAllTeamsBasicQueryResponse,
  GET_ALL_TEAMS_BASIC_QUERY,
} from "../../data-access/team/team.queries";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Loader from "../../components/loader";

const labelClasses = "flex flex-col items-center relative pb-7";
const inputClasses = "text-black w-full p-1 h-8";
const inputErrorClasses = "border-2 border-red-500";
const errorMessageClasses = "absolute text-red-500 bottom-2 text-xs";

export default function CreatePlayer() {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState, setValue } =
    useForm<Player>();

  const {
    loading: loadingTeams,
    error: errorTeams,
    data: dataTeams,
  } = useQuery<GetAllTeamsBasicQueryResponse>(GET_ALL_TEAMS_BASIC_QUERY);

  const [createPlayer, { data, loading, error }] = useMutation(
    CREATE_PLAYER_MUTATION
  );

  const onSubmit = ({
    name,
    teamId,
    positions,
    birth,
    height,
    weight,
    foot,
  }: Player) => {
    if (Object.keys(formState.errors).length !== 0) {
      return;
    }
    createPlayer({
      variables: {
        name,
        teamId,
        positions,
        birth: birth.toString(),
        height: +height,
        weight: +weight,
        foot,
      },
    });
    reset({
      name: "",
      positions: undefined,
      birth: "",
      height: undefined,
      weight: undefined,
      foot,
    });
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    const subscription = watch((formData) => {
      if ((dataTeams?.getAllTeams || []).length > 0 && !formData.teamId) {
        setValue("teamId", dataTeams?.getAllTeams[0]?.id || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dataTeams]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-center h-screen relative font-qatar text-white">
      <Link href={""} onClick={goBack} className="absolute left-5 top-0">
        <ArrowLeftIcon className="h-8 mr-2" />
        <span>Back</span>
      </Link>
      <h1 className="mt-5 text-3xl">Create a player</h1>
      <form
        className="flex flex-col w-80 h-auto m-auto py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={labelClasses}>
          Name
          <input
            className={`${inputClasses} ${
              formState.errors.name && inputErrorClasses
            }`}
            type="text"
            {...register("name", { required: "required" })}
          />
          {formState.errors.name && (
            <span className={errorMessageClasses}>
              {formState.errors.name.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Team
          <select
            className={`${inputClasses} ${
              formState.errors.teamId && inputErrorClasses
            }`}
            {...register("teamId", { required: "required" })}
          >
            {dataTeams?.getAllTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          {formState.errors.teamId && (
            <span className={errorMessageClasses}>
              {formState.errors.teamId.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Positions
          <select
            className={`${inputClasses} h-28 ${
              formState.errors.positions && inputErrorClasses
            }`}
            {...register("positions", { required: "required" })}
            multiple
          >
            {Object.keys(PlayerPosition).map((playerPosition) => (
              <option key={playerPosition} value={playerPosition}>
                {playerPosition}
              </option>
            ))}
          </select>
          {formState.errors.positions && (
            <span className={errorMessageClasses}>
              {formState.errors.positions.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Birth
          <input
            className={`${inputClasses} ${
              formState.errors.birth && inputErrorClasses
            }`}
            type="date"
            {...register("birth", { required: "required" })}
          />
          {formState.errors.birth && (
            <span className={errorMessageClasses}>
              {formState.errors.birth.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Height
          <input
            className={`${inputClasses} ${
              formState.errors.height && inputErrorClasses
            }`}
            type="number"
            {...register("height", { required: "required" })}
          />
          {formState.errors.height && (
            <span className={errorMessageClasses}>
              {formState.errors.height.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Weight
          <input
            className={`${inputClasses} ${
              formState.errors.weight && inputErrorClasses
            }`}
            type="number"
            {...register("weight", { required: "required" })}
          />
          {formState.errors.weight && (
            <span className={errorMessageClasses}>
              {formState.errors.weight.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Foot
          <select
            className={`${inputClasses} ${
              formState.errors.foot && inputErrorClasses
            }`}
            {...register("foot", { required: "required" })}
          >
            {Object.keys(PlayerFoot).map((playerFoot) => (
              <option key={playerFoot} value={playerFoot}>
                {playerFoot}
              </option>
            ))}
          </select>
          {formState.errors.foot && (
            <span className={errorMessageClasses}>
              {formState.errors.foot.message}
            </span>
          )}
        </label>
        <button
          className="border rounded border-white h-12 bg-black hover:bg-gray-800 active:bg-gray-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
