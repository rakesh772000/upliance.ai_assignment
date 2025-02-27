import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Typography, Paper } from "@mui/material";
import "react-quill/dist/quill.snow.css";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  editor: {
    minHeight: "200px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    padding: "10px",
    border: "1px solid #ccc",
  },
};

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorKey, setEditorKey] = useState<number>(0); 

  // Load saved content from localStorage and format it
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("users");
      const savedContent = localStorage.getItem("richText");

      if (savedData) {
        const users = JSON.parse(savedData);

        if (Array.isArray(users) && users.length > 0) {
          const formattedContent = users
            .map(
              (user, index) =>
                `<p><strong>User ${index + 1}:</strong></p>
                 <p><strong>Name:</strong> ${user.name}</p>
                 <p><strong>Address:</strong> ${user.address}</p>
                 <p><strong>Email:</strong> ${user.email}</p>
                 <p><strong>Phone:</strong> ${user.phone}</p>
                 <hr style="border: 0.5px solid #ddd; margin: 10px 0;">`
            )
            .join("");

          setEditorContent(formattedContent);
          setEditorKey((prev) => prev + 1); 
          return;
        }
      }

      // Fallback to saved rich text if no user data is found
      setEditorContent(savedContent ?? "");
      setEditorKey((prev) => prev + 1); 
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
    }
  }, []);

  // Update content and persist to localStorage
  const handleChange = (content: string) => {
    setEditorContent(content);
    localStorage.setItem("richText", content);
  };

  return (
    <Paper sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        User Data Preview (Rich Text)
      </Typography>
      <ReactQuill
        key={editorKey} 
        value={editorContent}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
        theme="snow"
        style={styles.editor}
      />
    </Paper>
  );
};

export default RichTextEditor;
