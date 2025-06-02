import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeMirrorEditor,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertFrontmatter,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type SandpackConfig,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { ClientOnly } from "remix-utils/client-only";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { toast } from "sonner";
import { useMarkdownUploader } from "~/client/store";
import { useNavigate } from "react-router";
import { useRef } from "react";
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();
const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "dark",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};
export default function PostEditor({ md, id }: { md?: string; id?: string }) {
  let mdRef = useRef<MDXEditorMethods>(null);
  let { temp } = useMarkdownUploader();
  return (
    <div className="bg-base-300 min-h-[calc(100dvh-80px)]  ">
      <div className="">
        <ClientOnly
          fallback={
            <div className="h-screen grid-center bg-base-300">
              <h2 className="text-primary font-bold">Loading Editor</h2>
            </div>
          }
        >
          {() => {
            let edits = localStorage.getItem(`edits_${id}`);
            return (
              <MDXEditor
                contentEditableClassName={`min-h-[calc(100dvh-120px)] bg-base-100 prose max-w-full !important`}
                markdown={edits ?? md ?? "hello world"}
                suppressHtmlProcessing
                ref={mdRef}
                plugins={[
                  toolbarPlugin({
                    toolbarClassName: "top-0",
                    toolbarContents: () => (
                      <>
                        <DiffSourceToggleWrapper>
                          <UndoRedo />
                          <CreateLink />
                          <BoldItalicUnderlineToggles />
                          <BlockTypeSelect />
                          <InsertFrontmatter />
                          <ListsToggle />
                          <InsertCodeBlock />
                          <UndoRedo />
                          <Uploader editorRef={mdRef} id={id} oldMd={md} />
                          <ClearMd />
                        </DiffSourceToggleWrapper>
                      </>
                    ),
                  }),
                  // codeBlockPlugin({
                  //   defaultCodeBlockLanguage: "js",
                  // }),
                  codeBlockPlugin({
                    codeBlockEditorDescriptors: [
                      {
                        priority: -10,
                        match: (_) => true,
                        Editor: CodeMirrorEditor,
                      },
                    ],
                  }),
                  sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                  codeMirrorPlugin({
                    codeBlockLanguages: {
                      js: "JavaScript",
                      css: "CSS",
                    },
                  }),
                  linkDialogPlugin(),
                  tablePlugin(),
                  headingsPlugin(),
                  thematicBreakPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  diffSourcePlugin({
                    diffMarkdown: md ?? "Hello World",
                  }),
                  frontmatterPlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                ]}
              />
            );
          }}
        </ClientOnly>
      </div>
    </div>
  );
}

interface UploaderProps {
  editorRef?: React.RefObject<MDXEditorMethods | null>;
  oldMd?: string;
  id?: string;
}
let Uploader = (props: UploaderProps) => {
  let { updateTemp } = useMarkdownUploader();
  let nav = useNavigate();
  return (
    <div
      className="btn btn-sm my-1 btn-primary"
      onClick={() => {
        let md = props.editorRef?.current?.getMarkdown();
        if (!md)
          return toast.error("Please write some content before uploading.");
        localStorage.setItem(`edits_` + props.id, md);
        if (md?.length < 10)
          return toast.error("Please write some content before uploading.");
        updateTemp(md ?? "");
        return nav("/post/update/" + props.id);
      }}
    >
      Upload
    </div>
  );
};

let ClearMd = (props: UploaderProps) => {
  let clearStorage = () => {
    localStorage.removeItem("temp");
    props.editorRef?.current?.setMarkdown("hello world");
    toast.error("cleared");
  };
  return (
    <div>
      <button className="btn btn-sm my-1  btn-error" onClick={clearStorage}>
        Clear
      </button>
    </div>
  );
};
