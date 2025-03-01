import React, { useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Divider, 
  TextField, 
  Box, 
  Alert, 
  CircularProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

const MyPDFs = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  // Fetch PDFs from the server
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:8000/list_pdfs");
        if (response.ok) {
          const data = await response.json();
          setPdfs(data.pdfs);
        } else {
          throw new Error("Failed to fetch PDFs");
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setError("Failed to load your PDFs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const handleGenerateQuestions = (pdf) => {
    setSelectedPdf(pdf);
    setPrompt(`Generate 10 questions about ${pdf.title} from the data provided in your context. Note that the questions should be complex and cover wider areas and topics present in the context`);
    setDialogOpen(true);
  };

  const handleStartQuiz = () => {
    setDialogOpen(false);
    navigate(`/quiz?prompt=${encodeURIComponent(prompt)}&type=pdf&source=${encodeURIComponent(selectedPdf.file_path)}`);
  };

  const handleDeletePdf = async (pdfId) => {
    if (window.confirm("Are you sure you want to delete this PDF? This action cannot be undone.")) {
      try {
        const response = await fetch(`http://localhost:8000/delete_pdf/${pdfId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          // Remove the deleted PDF from the state
          setPdfs(pdfs.filter(pdf => pdf.id !== pdfId));
        } else {
          throw new Error("Failed to delete PDF");
        }
      } catch (error) {
        console.error("Error deleting PDF:", error);
        setError("Failed to delete PDF. Please try again later.");
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading your PDFs...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Uploaded PDFs
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {pdfs.length === 0 ? (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            You haven't uploaded any PDFs yet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Go to Upload Page
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {pdfs.map((pdf) => (
            <Grid item xs={12} sm={6} md={4} key={pdf.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ArticleIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      {pdf.title}
                    </Typography>
                  </Box>
                  
                  {pdf.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {pdf.description}
                    </Typography>
                  )}
                  
                  <Chip 
                    label={pdf.category} 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="body2" color="text.secondary">
                    Uploaded: {new Date(pdf.upload_date).toLocaleDateString()}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Chunks indexed: {pdf.indexed_chunks}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<QuizIcon />}
                    onClick={() => handleGenerateQuestions(pdf)}
                    fullWidth
                  >
                    Generate Questions
                  </Button>
                  
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeletePdf(pdf.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>

      {/* Question Generation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Generate Questions from {selectedPdf?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Customize your prompt to generate specific types of questions:
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            margin="normal"
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Tips: Specify the number of questions, difficulty level, or focus areas to get better results.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleStartQuiz} 
            variant="contained" 
            color="primary"
            disabled={!prompt.trim()}
          >
            Start Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyPDFs;