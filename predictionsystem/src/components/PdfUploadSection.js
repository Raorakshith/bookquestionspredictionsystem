import React, { useState } from "react";
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Alert, 
  CircularProgress
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArticleIcon from "@mui/icons-material/Article";

const PdfUploadSection = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      // Auto-populate title with filename (without extension)
      const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
      if (!title) setTitle(fileName);
      setMessage({ type: "", text: "" });
    } else {
      setFile(null);
      setMessage({ type: "error", text: "Please select a valid PDF file" });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a PDF file" });
      return;
    }
    
    if (!title) {
      setMessage({ type: "error", text: "Please enter a title" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await fetch("http://localhost:8000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ 
          type: "success", 
          text: `PDF uploaded successfully! ${result.chunks_indexed} chunks indexed.` 
        });
        // Reset form
        setFile(null);
        setTitle("");
        setDescription("");
        setCategory("Uncategorized");
        // Reset file input
        document.getElementById("pdf-upload-input").value = "";
      } else {
        const error = await response.json();
        setMessage({ 
          type: "error", 
          text: error.detail || "Failed to upload PDF" 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "Server error, please try again later" 
      });
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Uncategorized",
    "Cyber Security",
    "Cloud Computing",
    "Web Designing",
    "Biology",
    "Dot Net",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry"
  ];

  return (
    <Grid 
      container 
      spacing={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 5,
        px: 2,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Upload Your PDF for Question Generation
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Upload a PDF to generate customized questions based on its content
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card
          sx={{
            minHeight: 200,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {message.text && (
              <Alert 
                severity={message.type} 
                sx={{ mb: 3 }}
                onClose={() => setMessage({ type: "", text: "" })}
              >
                {message.text}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    border: '2px dashed #9c27b0',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    mb: 3,
                    bgcolor: file ? 'rgba(156, 39, 176, 0.04)' : 'transparent'
                  }}
                >
                  <input
                    accept="application/pdf"
                    id="pdf-upload-input"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="pdf-upload-input">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadFileIcon />}
                      color="secondary"
                      sx={{ mb: 2 }}
                    >
                      Select PDF
                    </Button>
                  </label>
                  
                  {file ? (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArticleIcon color="secondary" sx={{ mr: 1 }} />
                      <Typography>{file.name}</Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Drag and drop or click to select a PDF file
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  helperText="Required"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleUpload}
                  disabled={loading || !file}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? "Uploading..." : "Upload PDF"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PdfUploadSection;