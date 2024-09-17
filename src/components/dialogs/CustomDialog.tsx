import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/text-area";
import SearchBar from "./SearchBar";

const CustomFormDialog = (props: any) => {
  const { isOpen, setIsOpen, fields, apiFunction } = props;
  const [formData, setFormData] = useState({});

  const handleChange = (e: any, field: string) => {
    if (field === "file") {
      // Check if any file is selected
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]; // Lấy tệp đầu tiên (hoặc lặp qua nếu cần nhiều tệp)
        setFormData({ ...formData, [field]: file });
      } else {
        // Nếu không có tệp nào được chọn
        console.log("No file selected");
      }
    }
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCloseDialog = () => {
    setIsOpen(!isOpen.open);
    setFormData({});
  };

  const handleSubmit = () => {
    if (apiFunction && typeof apiFunction === "function") {
      let updatedFormData = { ...formData };

      // Add id if function is Edit, Assign, or Delete
      if (
        isOpen.func === "Edit" ||
        isOpen.func === "Assign" ||
        isOpen.func === "Delete"
      ) {
        updatedFormData = { id: isOpen.id, ...updatedFormData };
        console.log(updatedFormData);
      }

      if (isOpen.func === "Add") {
        var user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        updatedFormData = { userId: user.email, ...updatedFormData };
        console.log(updatedFormData);
      }
      // Check if userId exists and is not empty
      if (
        isOpen.func === "Assign" &&
        (!updatedFormData.userId || updatedFormData.userId.length === 0)
      ) {
        alert("Please select at least one user.");
        return;
      }

      // Ensure all required fields are filled
      if (Object.keys(updatedFormData).length >= fields.length) {
        apiFunction(updatedFormData);
        handleCloseDialog();
      } else {
        alert("You have to fill all the input!");
      }
    }
  };

  return (
    <Dialog open={isOpen.open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isOpen.func} exercise {isOpen.id}
          </DialogTitle>
          <DialogDescription>
            Make changes to the item here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field: any) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-left">
                {field.label}
              </Label>
              {field.type === "text-area" ? (
                <Textarea
                  id={field.name}
                  className="col-span-3"
                  onChange={(e) => handleChange(e, field.name)}
                />
              ) : field.type === "file" ? (
                <Card className="col-span-3">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2 text-sm">
                      <Input
                        id="file"
                        type="file"
                        placeholder="File"
                        accept=".rar,.zip"
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : field.type === "search" ? (
                <SearchBar setFormData={setFormData} />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  className="col-span-3"
                  onChange={(e) => handleChange(e, field.name)}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={handleSubmit}>
            {isOpen.func}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomFormDialog;
