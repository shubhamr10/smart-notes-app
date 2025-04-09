import {useEffect, useState} from "react";
import NoteEditor from "./components/NoteEditor/NoteEditor.jsx";




function App(){
    const [notes, setNotes] = useState([]);

    // load the notes from localStorage for the first time
    useEffect(()=>{
        const stored = localStorage.getItem("smart-notes");
        if(stored){
            const parsedStoredNotes = JSON.parse(stored);
            if(parsedStoredNotes && Array.isArray(parsedStoredNotes) && parsedStoredNotes.length > 0){
                setNotes(JSON.parse(stored));
            }
        }
    },[]);

    // save the notes to localstorage whenever it changes.
    useEffect(() => {
        localStorage.setItem("smart-notes", JSON.stringify(notes));
    }, [notes]);

    const handleAddNotes = (note) => {
        setNotes((prevState) => [...prevState, note])
    }

    return (
        <div>
            <NoteEditor handleAddNotes={handleAddNotes}/>
            <div className="notes-display-container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
                <h2>Saved Notes</h2>
                {
                    notes.map((note, index) => (
                        <div key={index} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App;