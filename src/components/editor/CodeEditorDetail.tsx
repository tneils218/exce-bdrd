import React, { useRef, useState } from "react";
import {
  selectedLanguageOptionProps,
  SelectLanguages,
} from "./SelectLanguages.tsx";
import Editor from "@monaco-editor/react";
import { AlertTriangle, Loader, Play } from "lucide-react";
import { codeSnippets, languageOptions } from "./config";
import toast from "react-hot-toast";
import { compileCode } from "@/components/editor/complite.ts";
import { ModeToggle } from "@/components/themes/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useLocation } from "react-router-dom";
import CustomFormDialog from "../dialogs/CustomDialog.tsx";
import exercisesAPI from "@/api/excercise.api.ts";

export interface CodeSnippetsProps {
  [key: string]: string;
}

const EditorComponent: React.FC = ({}) => {
  const location = useLocation();
  const { item } = location.state || { item: null };
  const [sourceCode, setSourceCode] = useState(codeSnippets["javascript"]);
  const [languageOption, setLanguageOption] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [isOpen, setIsOpen] = useState({ open: false, func: "", id: "" });
  const [fields, setFields] = useState([]);
  const [apiFunc, setApiFunc] = useState();
  const [err, setErr] = useState(false);
  const editorRef = useRef(null);

  const handlePopup = (func: any, fields: any, apiFunc: any, id: any = "") => {
    setIsOpen({ open: !isOpen.open, func: func, id: id });
    setFields(fields);
    setApiFunc(apiFunc);
  };

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleOnchange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
    }
  }

  function onSelect(value: selectedLanguageOptionProps) {
    setLanguageOption(value);
    setSourceCode(codeSnippets[value.language]);
  }

  async function executeCode() {
    setLoading(true);
    const requestData = {
      language: languageOption.language,
      version: languageOption.version,
      files: [
        {
          content: sourceCode,
        },
      ],
    };
    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output.split("\n"));
      setLoading(false);
      setErr(false);
      toast.success("Compiled Successfully");
    } catch (error) {
      setErr(true);
      setLoading(false);
      toast.error("Failed to compile the Code");
    }
  }

  return (
    <div className="h-[93vh] dark:bg-slate-900 rounded-2xl shadow-2xl py-6 pl-12 pr-8 flex flex-col">
      {/* Shared Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          Codex BDRD
        </h2>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div className="w-[230px]">
            <SelectLanguages
              onSelect={onSelect}
              selectedLanguageOption={languageOption}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* LEFT SIDE: Problem Statement */}
        <div className="w-1/2 pr-4 flex flex-col">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl p-4 flex-grow overflow-auto">
            <p>{item.body}</p>
          </div>
        </div>

        {/* RIGHT SIDE: Editor and Output */}
        <div className="w-1/2 flex flex-col">
          {/* EDITOR */}
          <div className=" h-3/4 flex-grow bg-slate-400 dark:bg-slate-950 p-3 rounded-2xl">
            <Editor
              theme={"vs-dark"}
              height="100%"
              defaultLanguage={languageOption.language}
              defaultValue={sourceCode}
              onMount={handleEditorDidMount}
              value={sourceCode}
              onChange={handleOnchange}
              language={languageOption.language}
            />
          </div>

          {/* OUTPUT */}
          <div className="h-1/4 bg-slate-300 dark:bg-slate-900 p-2 rounded-2xl mt-4 flex-shrink-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-400 rounded dark:bg-slate-950 px-6 py-2">
                <h2>Output</h2>
                {loading ? (
                  <Button
                    disabled
                    size={"sm"}
                    className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                  >
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    <span>Running please wait...</span>
                  </Button>
                ) : (
                  <Button
                    onClick={executeCode}
                    size={"sm"}
                    className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    <span>Run</span>
                  </Button>
                )}
              </div>
              <div className="px-6 space-y-2 max-h-40 overflow-y-auto">
                {err ? (
                  <div className="flex items-center space-x-2 text-red-500 border border-red-600 px-6 py-6">
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-xs">
                      Failed to Compile the Code, Please try again!
                    </p>
                  </div>
                ) : (
                  <>
                    {output.map((item) => (
                      <p className="text-sm" key={item}>
                        {item}
                      </p>
                    ))}
                  </>
                )}
              </div>
              <Button
                className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                onClick={() => handlePopup(
                  "Submit",
                  [
                    {
                      name: "file",
                      label: "File",
                      type: "file",
                    },
                  ],
                  () => exercisesAPI.submit
                )}
              >
                Submit Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CustomFormDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fields={fields}
        apiFunction={apiFunc}
      />
    </div>
  );
};
export default EditorComponent;
