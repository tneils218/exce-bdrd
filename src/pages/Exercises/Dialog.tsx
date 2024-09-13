import exercisesAPI from "@/api/excercise.api";
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

const DialogDemo = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    if(isOpen.func === "Add")
    exercisesAPI.add(title, content);
else if(isOpen.func === "Edit"){
    exercisesAPI.edit(isOpen.id,title, content)
}
    
  };
  return (
    <Dialog open={isOpen.open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isOpen.func}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-left">
              Content
            </Label>
            <Input
              id="content"
              type="text-area"
              className="col-span-3"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <Label htmlFor="file" className="text-sm font-medium">
                File
              </Label>
              <Input
                id="file"
                type="file"
                placeholder="File"
                accept="image/*"
              />
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={handleSubmit}>
            {isOpen.func}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
