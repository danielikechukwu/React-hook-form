import { useForm, UseFormReturn, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IFormInput {
  username: string,
  email: string,
  channel: string,
  socials: {
    twitter: string,
    facebook: string,
  },
  phoneNumbers: string[],
  phnNumbers: {
    number: string
  }[]
}

const YoutubeForm = () => {

  const form: UseFormReturn<IFormInput> = useForm<IFormInput>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      socials: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phnNumbers: [{ number: ""}]
    },
  });

  const onSubmit = (data: IFormInput) => {
    console.log("Form submitted", data);
  };

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const { fields } = useFieldArray({
    name: 'phnNumbers',
    control
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/,
                message: "Invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                noBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            placeholder="Enter channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel name is compulsory",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="Enter twitter"
            {...register("socials.twitter", {
              required: {
                value: true,
                message: "Twitter is compulsory",
              },
            })}
          />
          <p className="error">{errors.socials?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Facebook</label>
          <input
            type="text"
            id="facebook"
            placeholder="Enter facebook"
            {...register("socials.facebook", {
              required: {
                value: true,
                message: "Facebook is required",
              },
            })}
          />
          <p className="error">{errors.socials?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            placeholder="Enter phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Primary phone number is compulsory",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            placeholder="Enter phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Secondary phone number is compulsory",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <button>submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
