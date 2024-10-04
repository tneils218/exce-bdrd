export const handleFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  
  if (data.image && data.image[0]) {
    formData.set("image", data.image[0]);
  }
 console.log(data);
  if (data.file && data.file[0]) {
    formData.set("file", data.file[0]);
  }

  return formData;
};
