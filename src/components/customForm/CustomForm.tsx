import React, { useState } from "react";
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
  multiple?: boolean;
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

  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File[] }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [fieldName]: filesArray,
      }));
    }
  };

  const removeFile = (fieldName: string, index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...(prevFiles[fieldName] || [])];
      updatedFiles.splice(index, 1);
      return { ...prevFiles, [fieldName]: updatedFiles };
    });

    const fileInput = document.getElementById(fieldName) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; 
    }
  };

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (selectedFiles[key]) {
        selectedFiles[key].forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value as string);
      }
    });
    onSubmit(formData);
    reset();
    setSelectedFiles({});
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label className="font-semibold dark:text-gray-200">
              {field.label}
            </Label>
            <div className="flex flex-col">
              <Input
                id={field.name}
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                accept={field.type === "file" ? field.accept : undefined}
                multiple={field.multiple}
                className="border p-2 rounded-md dark:bg-slate-600 dark:text-gray-200 dark:border-slate-500"
                onChange={(e) =>
                  field.type === "file" ? handleFileChange(e, field.name) : undefined
                }
              />

              {field.type === "file" && selectedFiles[field.name] && (
                <div className="mt-2 space-y-2">
                  {selectedFiles[field.name].map((file, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-100 dark:bg-slate-600 p-2 rounded-md"
                    >
                      <span className="text-sm dark:text-gray-200">{file.name}</span>
                      <Button
                        type="button"
                        onClick={() => removeFile(field.name, index)}
                        className="bg-transparent border-0 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 rounded-md p-2"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
