import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Team } from "../../data-access/team/team.model";
import { CREATE_TEAM_MUTATION } from "../../data-access/team/team.mutation";

export default function CreateTeam() {
  const { register, handleSubmit, reset } = useForm<Team>();

  const [createTeam, { data, loading, error }] =
    useMutation(CREATE_TEAM_MUTATION);

  const onSubmit = ({ name, flag_icon, background }: Team) => {
    createTeam({
      variables: {
        name,
        flag_icon,
        background,
      },
    });
    reset({
      name: "",
      flag_icon:"",
      background: ""
    });
  };
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if(loading){
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
          Flag Icon
          <input type="text" {...register("flag_icon")} />
        </label>
        <label>
          Background
          <input type="color" {...register("background")} />
        </label>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
}
