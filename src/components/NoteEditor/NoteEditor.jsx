import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./NoteEditor.css";

const NoteEditor = ({handleAddNotes}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = () => {
        if(title.trim() === "" && content.trim() === "") return;

        handleAddNotes({
            title,
            content
        });
        setContent("");
        setTitle("");

    }

    return (
        <div className={"editor-container"}>
            <h2>Create a Note</h2>
            <input type="text" id={"title"} name={"title"} value={title} className={"note-title"} onChange={(e) => setTitle(e.target.value)}/>
            <textarea name="content" id="content" value={content} placeholder={"Write a note here..."} className={"note-textarea"} onChange={(e) => setContent(e.target.value)} ></textarea>
            <div className={"save-note-container"}>
                <button className={"save-button"} id={"save-note"} onClick={() => handleSave()} >Save</button>
            </div>
            <div className="markdown-preview">
                <h3>Preview</h3>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default NoteEditor;

