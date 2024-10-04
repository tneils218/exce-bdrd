import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { Button } from "../ui/button"; // Adjust the path as necessary
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

interface Field {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  accept?: string;
}

interface GenericFormProps {
  schema: ZodSchema<any>;
  fields: Field[];
  onSubmit: (data: FormData) => void;
  defaultValues: any;
}

const CustomForm: React.FC<GenericFormProps> = ({
  schema,
  fields,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  console.log(defaultValues);
  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label className="font-semibold dark:text-gray-200">
              {field.label}
            </Label>
            <div className="flex">
              <Input
                id={field.name}
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                accept={field.type === "file" ? field.accept : undefined}
                className="border p-2 rounded-md dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500"
              />
            </div>
            {errors[field.name] && (
              <p className="text-red-500 dark:text-red-400">
                {errors[field.name]?.message?.toString()}
              </p>
            )}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100 mt-3 p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Submit
      </Button>
    </form>
  );
};

export default CustomForm;
