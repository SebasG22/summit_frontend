import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  const [showToast, setShowToast] = useState(false);

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
    setShowToast(true);
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
      {showToast && 
        <div id="toast-success" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center p-4 mb-4 w-full max-w-xs text-white rounded-lg shadow bg-black hover:bg-gray-900" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">Item created successfully.</div>
          <button type="button" onClick={() => setShowToast(false)} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      }
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
