import React, { useState } from "react";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { Button } from "../ui/button"; // Adjust the path as necessary
import { Input } from "../ui/input";

interface Field {
  name: string;
  type: string;
  placeholder?: string;
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
    const [file, setFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
      resolver: zodResolver(schema),
      defaultValues,
    });
  
    const handleFormSubmit: SubmitHandler<any> = (data) => {
      const formData = new FormData();
      console.log(data);
      Object.keys(data).forEach((key) => {
        if (key !== "image" && key !== "imageUrl") {
          formData.append(key, data[key]);
        }
      });
      if (file) {
        console.log(file);
        formData.append("image", file);
      }
      onSubmit(formData);
      reset();
    };
  
    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)} control={control}>
          <div className="flex flex-col space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <Input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  accept={field.type === "file" ? field.accept : undefined}
                  onChange={
                    field.type === "file" ? (e) => setFile(e.target.files?.[0] || null) : undefined
                  }
                  className="border p-2 rounded-md dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500"
                />
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
        </Form>
    );
  };
  
export default CustomForm;
