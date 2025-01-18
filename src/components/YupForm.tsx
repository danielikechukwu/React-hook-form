import {
    useForm,
    UseFormReturn
  } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";

interface IFormInput {
    username: string,
    email: string,
    channel: string
  }

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email format is not valid").required("Email is required"),
    channel: yup.string().required("Channel is required")
});

const YupForm = () => {

      const form: UseFormReturn<IFormInput> = useForm<IFormInput>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "",
            email: "",
            channel: ""
        }
      });

      const { handleSubmit, register, formState } = form;

      const { errors } = formState;

      const onSubmit = (data: IFormInput) => {
        console.log("Form submitted", data);
      };

  return (
    <div>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            {...register("username")}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            placeholder="Enter channel"
            {...register("channel")}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>submit</button>

      </form>

    </div>
  )
}

export default YupForm