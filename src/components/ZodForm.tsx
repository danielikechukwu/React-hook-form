import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IFormInput {
  username: string;
  email: string;
  channel: string;
}

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Email format is not valid"),
    channel: z.string().nonempty("Channel is required")
});

const ZodForm = () => {
  const form: UseFormReturn<IFormInput> = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      channel: "",
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
    
  );
};

export default ZodForm;
