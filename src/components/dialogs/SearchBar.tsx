import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import userApi from "@/api/user.api";


// export type User = {
//   id: number;
//   fullName: string;
//   password: string;
//   email: string;
//   address: Address;
//   phone: string;
//   website: string;
//   company: Company;
// };

// export type students = User[];
const SearchBar = (props: any) => {
    const { setFormData } = props;
    // const [open, setOpen] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [students, setStudents] = useState([]);
  
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await userApi.getAll();
          const students = response.data.filter((user: any) => user.role.includes("Students"));
          setStudents(students);
        } catch (error) {
          console.error("Failed to fetch students:", error);
        }
      };
      fetchStudents();
    }, []);
  
    const handleSelect = (studentId: number) => {
        setSelectedStudentIds((prevSelectedStudentIds) => {
        const isSelected = prevSelectedStudentIds.includes(studentId); // Kiểm tra xem userId đã được chọn hay chưa
        let newSelectedStudentIds;
  
        if (isSelected) {
          // Nếu đã được chọn, bỏ chọn userId
          newSelectedStudentIds = prevSelectedStudentIds.filter((id) => id !== studentId);
        } else {
          // Nếu chưa được chọn, thêm userId vào danh sách
          newSelectedStudentIds = [...prevSelectedStudentIds, studentId];
        }
  
        // Cập nhật formData với id và danh sách userId
        setFormData({
          userId: newSelectedStudentIds,
        });
  
        return newSelectedStudentIds;
      });
    };
  
    return (
      <Command className="col-span-4">
        <CommandInput placeholder="Search data..." />
        <CommandList className="command-list-container">
          <CommandGroup>
            {students.length > 0 ? (
              students.map((student) => (
                <CommandItem
                  key={student.id}
                  value={student.fullName}
                  onSelect={() => handleSelect(student.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStudentIds.includes(student.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {student.fullName}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No data found.</CommandEmpty>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };
  export default SearchBar;
  
  
  

