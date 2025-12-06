import Button from "components/button/";
import Checkbox from "components/checkbox";
import Input from "components/input";
import Radio from "components/radio";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  text: string;
  accept: boolean;
  radio?: string;
};

const defaultValues: FormFields = {
  text: "",
  accept: false,
  radio: undefined,
};

const radioOptions = ["yes", "no"];

const Form = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormFields> = data => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-10 flex max-w-xl flex-col gap-10 border bg-white p-10"
    >
      <Input control={control} name="text" label="Text Input" />
      <Checkbox control={control} label="Accept" name="accept" />
      {radioOptions.map(option => (
        <Radio control={control} value={option} name="radio" label={option} />
      ))}
      <Button onClick={() => null} name="submit" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
