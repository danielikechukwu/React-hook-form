import {
  useForm,
  UseFormReturn,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IFormInput {
  username: string;
  email: string;
  channel: string;
  socials: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phnNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date | null;
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
      phnNumbers: [{ number: "" }],
      age: 0,
      dob: null,
    },
  });

  const onSubmit = (data: IFormInput) => {
    console.log("Form submitted", data);
  };

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;

  const { errors, isDirty, isValid } = formState;

  const handleGetValues = () => {
    console.log("Get values : ", getValues());
  };

  const handleSetValues = () => {
    setValue("username", "James", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onErrors = (errors: FieldErrors<IFormInput>) => {
    console.log("Form errors : ", errors);
  };

  const { fields, append, remove } = useFieldArray({
    name: "phnNumbers",
    control,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} noValidate>
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
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="Enter age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is compulsory",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            placeholder="Enter date of birth"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of Birth is compulsory",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="Enter twitter"
            {...register("socials.twitter", {
              disabled: watch("channel") === "",
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

        <div>
          <label>List of phone number</label>

          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phnNumbers.${index}.number`)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                append({ number: "" });
              }}
            >
              Add phone number
            </button>
          </div>
        </div>

        <button disabled={!isDirty || !isValid}>submit</button>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValues}>
          Set values
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
