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

export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Users = User[];
const SearchBar = (props: any) => {
    const { setFormData } = props;
    // const [open, setOpen] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [users, setUsers] = useState<Users>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await userApi.getAll();
          setUsers(response.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };
      fetchUsers();
    }, []);
  
    const handleSelect = (userId: number) => {
      setSelectedUserIds((prevSelectedUserIds) => {
        const isSelected = prevSelectedUserIds.includes(userId); // Kiểm tra xem userId đã được chọn hay chưa
        let newSelectedUserIds;
  
        if (isSelected) {
          // Nếu đã được chọn, bỏ chọn userId
          newSelectedUserIds = prevSelectedUserIds.filter((id) => id !== userId);
        } else {
          // Nếu chưa được chọn, thêm userId vào danh sách
          newSelectedUserIds = [...prevSelectedUserIds, userId];
        }
  
        // Cập nhật formData với id và danh sách userId
        setFormData({
          userId: newSelectedUserIds,
        });
  
        return newSelectedUserIds;
      });
    };
  
    return (
      <Command className="col-span-4">
        <CommandInput placeholder="Search data..." />
        <CommandList className="command-list-container">
          <CommandGroup>
            {users.length > 0 ? (
              users.map((user: User) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => handleSelect(user.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUserIds.includes(user.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.name}
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
  
  
  

