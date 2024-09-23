import exercisesAPI from "@/api/excercise.api";
// import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  ShoppingCart,
  Users2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/themes/mode-toggle";
import CustomFormDialog from "@/components/dialogs/CustomDialog";
import { useNavigate } from "react-router-dom";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

export type Exercises = {
  id: number;
  title: string;
  content: string;
  userId: number;
  label: string;
};

const HomePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercises[]>([]);
  const [isOpen, setIsOpen] = useState({ open: false, func: "", id: "" });
  const [label, setLabel] = useState("All");
  const [fields, setFields] = useState([]);
  const [apiFunc, setApiFunc] = useState();
  const isMentor = true;
  const navigate = useNavigate();
  // localStorage.getItem("token") ==
  // JSON.parse(localStorage.getItem("user")).token;

  const handlePopup = (func: any, fields: any, apiFunc: any, id: any = "") => {
    setIsOpen({ open: !isOpen.open, func: func, id: id });
    setFields(fields);
    setApiFunc(apiFunc);
  };

  const handleClick = (item: any) => {
    navigate("/test", { state: { item } });
  };

  const fetchExercises = async () => {
    let response;
    if (isMentor) {
      response = await exercisesAPI.getAll();
    } else {
      response = await exercisesAPI.getAllByUserId();
    }
    setExercises(response.data);
    setFilteredExercises(response.data);
  };

  const filterExercisesByLabel = () => {
    if (label === "All") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(exercises.filter((item) => item.label === label));
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    filterExercisesByLabel();
  }, [label, exercises]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ModeToggle /> Themes
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#">Excercises</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Exams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="All">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="All" onClick={() => setLabel("All")}>
                  All
                </TabsTrigger>
                {Array.from(new Set(exercises.map((i) => i.label))).map(
                  (uniqueLabel) =>
                    uniqueLabel && (
                      <TabsTrigger
                        value={uniqueLabel}
                        onClick={() => setLabel(uniqueLabel)}
                        key={uniqueLabel}
                      >
                        {uniqueLabel}
                      </TabsTrigger>
                    )
                )}
                {/* <TabsTrigger value="draft">MVC</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Kafka
                </TabsTrigger> */}
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Assigned
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Unassigned
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 "
                  onClick={() =>
                    handlePopup(
                      "Add",
                      [
                        {
                          name: "title",
                          label: "Title",
                          type: "text",
                        },
                        {
                          name: "content",
                          label: "Content",
                          type: "text-area",
                        },
                        {
                          name: "label",
                          label: "Label",
                          type: "text",
                        },
                        // {
                        //   name: "file",
                        //   label: "File",
                        //   type: "file",
                        // },
                      ],
                      () => exercisesAPI.add
                    )
                  }
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Exercise
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value={label}>
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Exercise</CardTitle>
                  <CardDescription>All the exercises.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>Content</TableHead>
                        {/* <TableHead>CreateAt</TableHead> */}
                        {/* <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead className="hidden md:table-cell">
                          Action
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExercises.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          {/* <TableCell>
                            <Badge variant="outline">Draft</Badge>
                          </TableCell> */}
                          {/* <TableCell className="text-left">
                            {" "}
                            {item.id}
                          </TableCell> */}
                          <TableCell className="hidden md:table-cell">
                            {item.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.label}
                          </TableCell>
                          <TableCell className="hidden md:table-cell ">
                            {item.content}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePopup(
                                      "Assign",
                                      [
                                        {
                                          name: "search",
                                          label: "Search",
                                          type: "search",
                                        },
                                      ],
                                      () => exercisesAPI.assign,
                                      item.id
                                    )
                                  }
                                >
                                  Assign
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePopup(
                                      "Edit",
                                      [
                                        {
                                          name: "title",
                                          label: "Title",
                                          type: "text",
                                        },
                                        {
                                          name: "content",
                                          label: "Content",
                                          type: "text-area",
                                        },
                                        {
                                          name: "label",
                                          label: "Label",
                                          type: "text",
                                        },
                                        // {
                                        //   name: "file",
                                        //   label: "File",
                                        //   type: "file",
                                        // },
                                      ],
                                      () => exercisesAPI.edit,
                                      item.id
                                    )
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePopup(
                                      "Delete",
                                      [],
                                      () => exercisesAPI.delete,
                                      item.id
                                    )
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleClick(item);
                                  }}
                                >
                                  Resolve
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>All</strong> of{" "}
                    <strong>{exercises.length}</strong> exercises
                  </div>
               
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <CustomFormDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fields={fields}
          apiFunction={apiFunc}
        />
      </div>
    </div>
  );
};

export default HomePage;
