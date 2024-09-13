import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
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
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCloseDialog = () => {
    setIsOpen(!isOpen.open);
    setFormData({});
  };

  const handleSubmit = () => {
    if (apiFunction && typeof apiFunction === "function") {
      if (Object.keys(formData).length === fields.length) {
        console.log(formData);
        apiFunction(formData);
        handleCloseDialog();
      } else alert("You have to fill all the input!");
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
              ) : //   : field.type === "file" ? (
              //     <Card className="col-span-3">
              //       <CardContent className="p-6 space-y-4">
              //         <div className="space-y-2 text-sm">
              //           <Input
              //             id="file"
              //             type="file"
              //             placeholder="File"
              //             accept=".rar,.zip"
              //             onChange={(e) => handleChange(e, field.name)}
              //           />
              //         </div>
              //       </CardContent>
              //     </Card>
              //   )
              field.type === "search" ? (
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
