import CodeEditor from "./code-editor";
import DynamicForm from "./dynamic-form";

export default function Playground(){
    return (
        <div className="flex w-full h-full">
            <DynamicForm />
            <CodeEditor/>
        </div>
    )
}