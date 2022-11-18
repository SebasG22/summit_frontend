import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Team } from "../../data-access/team/team.model";
import { CREATE_TEAM_MUTATION } from "../../data-access/team/team.mutation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Loader from "../../components/loader";

const labelClasses = "flex flex-col items-center relative pb-7";
const inputClasses = "text-black w-full p-1 h-8";
const inputErrorClasses = "border-2 border-red-500";
const errorMessageClasses = "absolute text-red-500 bottom-2 text-xs";

export default function CreateTeam() {
  const { register, handleSubmit, reset, formState, watch } = useForm<Team>();

  const [createTeam, { data, loading, error }] =
    useMutation(CREATE_TEAM_MUTATION);

  const onSubmit = ({ name, flag_icon, background }: Team) => {
    if (Object.keys(formState.errors).length !== 0) {
      return;
    }
    createTeam({
      variables: {
        name,
        flag_icon,
        background,
      },
    });
    reset({
      name: "",
      flag_icon: "",
      background: "",
    });
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-center h-screen relative font-qatar text-white">
      <Link href="/" className="absolute left-5 top-0">
        <ArrowLeftIcon className="h-8 mr-2" />
        <span>Back</span>
      </Link>
      <h1 className="mt-5 text-3xl">Create a team</h1>
      <form
        className="flex flex-col justify-between m-auto w-80 py-20"
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
          Flag Icon
          <input
            className={`${inputClasses} ${
              formState.errors.flag_icon && inputErrorClasses
            }`}
            type="text"
            {...register("flag_icon", { required: "required" })}
          />
          {formState.errors.flag_icon && (
            <span className={errorMessageClasses}>
              {formState.errors.flag_icon.message}
            </span>
          )}
        </label>
        <label className={labelClasses}>
          Background
          <input
            className={`${inputClasses} w-20 p-0`}
            type="color"
            {...register("background", { required: "required" })}
          />
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
