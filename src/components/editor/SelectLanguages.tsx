import React from "react";
import { languageOptions } from "@/components/editor/config.ts";

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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = languageOptions.find(
      (option) => option.language === selectedValue,
    );
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedLanguageOption.language}
        onChange={handleChange}
        className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
        {languageOptions.map((item) => (
          <option key={item.language} value={item.language}>
            {item.name} ({item.version})
          </option>
        ))}
      </select>
    </div>
  );
};
