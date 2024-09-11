import React from "react";
import { languageOptions } from "@/components/editor/config.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectLanguagesProps = {
  onSelect: (value: selectedLanguageOptionProps) => void;
  selectedLanguageOption: selectedLanguageOptionProps;
};
export type selectedLanguageOptionProps = {
  name: string;
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
};

export const SelectLanguages: React.FC<SelectLanguagesProps> = ({
  onSelect,
  selectedLanguageOption,
}) => {
  const handleChange = (selectedValue: string) => {
    const selectedOption = languageOptions.find(
      (option) => option.language === selectedValue,
    );
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleChange}
        defaultValue={selectedLanguageOption.language}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={`${selectedLanguageOption.name} (${selectedLanguageOption.version})`}
          />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((item) => (
            <SelectItem key={item.language} value={item.language}>
              {item.name} ({item.version})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
