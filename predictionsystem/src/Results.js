// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Card, CardContent, Typography, Button, Box, Modal, CircularProgress, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { auth, db } from './firebase';

// const Results = () => {
//     const location = useLocation();
//     const { questions, score } = location.state;
//     const [feedback, setFeedback] = useState('');
//     const [loadingFeedback, setLoadingFeedback] = useState(true);
//     const [loadingPrediction, setLoadingPrediction] = useState(false);
//     const [prediction, setPrediction] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [pastdata, setpastdata] = useState();
//     const generateResultsSummary = (questions) => {
//         return questions.map(question => {
//             let result;
//             if (!question.user_response) {
//                 result = 'skipped';
//             } else if (question.user_response === question.correct_answer) {
//                 result = 'correct';
//             } else {
//                 result = 'wrong';
//             }
//             return `${question.categories.join(',')}(${result})`;
//         }).join(', ');
//     };

//     useEffect(() => {
//         const topic = generateResultsSummary(questions);
//         db.collection('UsersTestData').doc(auth?.currentUser?.uid).collection('usersdata').add({ testSummary: topic, createdOn: new Date() }).then(res => {
//             console.log(res)
//         }).catch(err => {
//             console.log(err);
//         })
//         axios.get('http://localhost:8000/gemini_performanceanalysis', {
//             params: { topic: topic }
//         })
//             .then(response => {
//                 setFeedback(response.data.feedback);
//                 setLoadingFeedback(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching the feedback:', error);
//                 setLoadingFeedback(false);
//             });
//     }, [score, questions.length]);

//     useEffect(() => {
//         db.collection('UsersTestData').doc(auth?.currentUser?.uid).collection('usersdata').onSnapshot(snapShot => {
//             var combined = "";
//             snapShot.docs.map(snap => {
//                 combined = combined + snap.data().testSummary;
//             });
//             setpastdata(combined);
//         })
//     }, []);
//     const handleGeneratePrediction = (currentquestion) => {
//         setLoadingPrediction(true);
//         setShowModal(true);

//         axios.get('http://localhost:8000/gemini_prediction', {
//             params: {
//                 pastdata: pastdata,
//                 currentdata: JSON.stringify(currentquestion),
//             }
//         })
//             .then(response => {
//                 setPrediction(response.data.prediction);
//                 setLoadingPrediction(false);
//             })
//             .catch(error => {
//                 console.error('Error generating prediction:', error);
//                 setLoadingPrediction(false);
//             });
//     };

//     return (
//         <Container>
//             <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
//                 <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
//                     Your Score: {score} out of {questions.length}
//                 </Typography>
//             </Box>
//             {loadingFeedback ? (
//                 <CircularProgress />
//             ) : (
//                 <Box sx={{ maxHeight: '10rem', overflowY: 'auto', padding: 2, marginBottom: 4, border: '1px solid #ddd', borderRadius: '8px' }}>
//                     <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Performance Feedback:</Typography>
//                     <Typography variant="body1">{feedback}</Typography>
//                 </Box>
//             )}
//             {questions.map((question, index) => (
//                 <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
//                     <CardContent>
//                         <Typography variant="h6">{question.question}</Typography>
//                         <RadioGroup value={question.user_response || ''}>
//                             {['option_a', 'option_b', 'option_c', 'option_d'].map((option) => (
//                                 <FormControlLabel
//                                     key={option}
//                                     value={option}
//                                     control={<Radio disabled />}
//                                     label={question[option]}
//                                 />
//                             ))}
//                         </RadioGroup>
//                         <Typography>Correct Answer: {question.correct_answer}</Typography>
//                         <Typography>Your Response: {question.user_response ? question.user_response : 'Skipped'}</Typography>
//                         <Typography>
//                             {question.user_response?.replace('option_', '') === question.correct_answer ? 'Correct' : question.user_response ? 'Wrong' : 'Skipped'}
//                         </Typography>
//                         <Typography>Explanation: {question.explanation}</Typography>
//                         <Button variant="contained" color="primary" onClick={() => { handleGeneratePrediction(question) }}>Generate Prediction</Button>

//                     </CardContent>
//                 </Card>
//             ))}
//             <Modal
//                 open={showModal}
//                 onClose={() => setShowModal(false)}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
//                     <div style={{ backgroundColor: 'white', width: '80%', padding: 8, borderRadius: 8, position: 'relative' }}>
//                         <IconButton
//                             style={{ position: 'absolute', top: -5, right: 5 }}
//                             onClick={() => setShowModal(false)}
//                         >
//                             <CloseIcon />
//                         </IconButton>
//                         {loadingPrediction ? (
//                             <CircularProgress />
//                         ) : (
//                             <Typography id="modal-modal-description">
//                                 {prediction.split('').map((char, index) => (
//                                     <span key={index} style={{ animation: `typing 0.05s steps(${prediction.length}) ${index * 0.05}s` }}>
//                                         {char}
//                                     </span>
//                                 ))}
//                             </Typography>
//                         )}
//                     </div>
//                 </Box>
//             </Modal>
//         </Container>
//     );
// };

// export default Results;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Card, CardContent, Typography, Button, Box, Modal, CircularProgress, RadioGroup, FormControlLabel, Radio, IconButton, Paper, Divider } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { auth, db } from './firebase';

// const Results = () => {
//     const location = useLocation();
//     const { questions, score } = location.state;
//     const [feedback, setFeedback] = useState('');
//     const [loadingFeedback, setLoadingFeedback] = useState(true);
//     const [loadingPrediction, setLoadingPrediction] = useState(false);
//     const [prediction, setPrediction] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [pastdata, setPastData] = useState();

//     const generateResultsSummary = (questions) => {
//         return questions.map(question => {
//             let result;
//             if (!question.user_response) {
//                 result = 'skipped';
//             } else if (question.user_response?.replace("option_","") === question.correct_answer?.replace("option_","")) {
//                 result = 'correct';
//             } else {
//                 result = 'wrong';
//             }
//             return `${question.categories.join(',')} (${result})`;
//         }).join(', ');
//     };

//     useEffect(() => {
//         const topic = generateResultsSummary(questions);
//         db.collection('UsersTestData').doc(auth?.currentUser?.uid).collection('usersdata').add({ testSummary: topic, createdOn: new Date() })
//             .then(res => console.log(res))
//             .catch(err => console.error(err));

//         axios.get('http://localhost:8000/gemini_performanceanalysis', {
//             params: { topic }
//         })
//             .then(response => {
//                 setFeedback(response.data.feedback);
//                 setLoadingFeedback(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching the feedback:', error);
//                 setLoadingFeedback(false);
//             });
//     }, [score, questions.length]);

//     useEffect(() => {
//         db.collection('UsersTestData').doc(auth?.currentUser?.uid).collection('usersdata').onSnapshot(snapshot => {
//             let combined = '';
//             snapshot.docs.map(snap => combined += snap.data().testSummary);
//             setPastData(combined);
//         });
//     }, []);

//     const handleGeneratePrediction = (currentQuestion) => {
//         setLoadingPrediction(true);
//         setShowModal(true);

//         axios.get('http://localhost:8000/gemini_prediction', {
//             params: {
//                 pastdata: pastdata,
//                 currentdata: JSON.stringify(currentQuestion),
//             }
//         })
//             .then(response => {
//                 setPrediction(response.data.prediction);
//                 setLoadingPrediction(false);
//             })
//             .catch(error => {
//                 console.error('Error generating prediction:', error);
//                 setLoadingPrediction(false);
//             });
//     };

//     return (
//         <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
//             <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
//                 <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                         Your Score: {score} out of {questions.length}
//                     </Typography>
//                     <Divider sx={{ marginY: 2 }} />
//                 </Box>

//                 {loadingFeedback ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <Box sx={{ padding: 2, marginBottom: 4, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>Performance Feedback:</Typography>
//                         <Typography variant="body1" sx={{ marginTop: 2 }}>{feedback}</Typography>
//                     </Box>
//                 )}

//                 {questions.map((question, index) => (
//                     <Card key={index} sx={{ marginBottom: 3, borderRadius: '8px', backgroundColor: '#fffaf0' }}>
//                         <CardContent>
//                             <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#1976d2' }}>
//                                 {index + 1}. {question.question}
//                             </Typography>
//                             <RadioGroup value={question.user_response || ''}>
//                                 {['option_a', 'option_b', 'option_c', 'option_d'].map((option) => (
//                                     <FormControlLabel
//                                         key={option}
//                                         value={option}
//                                         control={<Radio disabled />}
//                                         label={question[option]}
//                                         sx={{ textAlign: 'left', marginLeft: 0 }}
//                                     />
//                                 ))}
//                             </RadioGroup>
//                             <Typography sx={{ fontWeight: 'bold', marginTop: 1 }}>Correct Answer: {question.correct_answer}</Typography>
//                             <Typography>Your Response: {question.user_response ? question.user_response?.replace("option_","") : 'Skipped'}</Typography>
//                             <Typography sx={{ fontWeight: 'bold', marginTop: 1, color: question.user_response?.replace('option_', '') === question.correct_answer?.replace("option_","") ? 'green' : 'red' }}>
//                                 {question.user_response?.replace('option_', '') === question.correct_answer ? 'Correct' : question.user_response ? 'Wrong' : 'Skipped'}
//                             </Typography>
//                             <Typography variant="body2" sx={{ marginTop: 1 }}>Explanation: {question.explanation}</Typography>
//                             <Button
//                                 variant="contained"
//                                 color="secondary"
//                                 sx={{ marginTop: 2 }}
//                                 onClick={() => handleGeneratePrediction(question)}
//                             >
//                                 Generate Prediction
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}

//                 <Modal
//                     open={showModal}
//                     onClose={() => setShowModal(false)}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                 >
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
//                         <Box sx={{ backgroundColor: 'white', width: '80%', padding: 4, borderRadius: 4, position: 'relative', boxShadow: 24 }}>
//                             <IconButton
//                                 sx={{ position: 'absolute', top: 16, right: 16 }}
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 <CloseIcon />
//                             </IconButton>
//                             {loadingPrediction ? (
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                                     <CircularProgress />
//                                 </Box>
//                             ) : (
//                                 <Typography id="modal-modal-description" sx={{ fontWeight: 'bold', color: '#333', marginTop: 2 }}>
//                                     {prediction}
//                                 </Typography>
//                             )}
//                         </Box>
//                     </Box>
//                 </Modal>
//             </Paper>
//         </Container>
//     );
// };

// export default Results;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db } from "./firebase";
import "./Results.css"; // New CSS file for typing effect
import Typist from "react-typist";

const Results = () => {
  const location = useLocation();
  const { questions, score } = location.state;
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pastdata, setPastData] = useState("");
  const [showTypingEffect, setShowTypingEffect] = useState(false);

  const generateResultsSummary = (questions) => {
    return questions
      .map((question) => {
        let result;
        if (!question.user_response) {
          result = "skipped";
        } else if (
          question.user_response?.replace("option_", "") ===
          question.correct_answer?.replace("option_", "")
        ) {
          result = "correct";
        } else {
          result = "wrong";
        }
        return `${question.categories.join(",")} (${result})`;
      })
      .join(", ");
  };
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const topic = generateResultsSummary(questions);
    db.collection("UsersTestData")
      .doc(auth?.currentUser?.uid)
      .collection("usersdata")
      .add({ testSummary: topic, createdOn: new Date() })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/gemini_performanceanalysis", {
        params: { topic },
      })
      .then((response) => {
        setFeedback(response.data.feedback);
        setLoadingFeedback(false);
      })
      .catch((error) => {
        console.error("Error fetching the feedback:", error);
        setLoadingFeedback(false);
      });
  }, [score, questions.length]);

  useEffect(() => {
    db.collection("UsersTestData")
      .doc(auth?.currentUser?.uid)
      .collection("usersdata")
      .onSnapshot((snapshot) => {
        let combined = "";
        snapshot.docs.map((snap) => (combined += snap.data().testSummary));
        setPastData(combined);
      });
  }, []);
  useEffect(() => {
    if (!loadingFeedback && feedback) {
      setShowTypingEffect(true); // Trigger Typist when feedback is ready
    }
  }, [loadingFeedback, feedback]);
  const handleGeneratePrediction = (currentQuestion) => {
    setLoadingPrediction(true);
    setShowModal(true);

    axios
      .get("http://localhost:8000/gemini_prediction", {
        params: {
          pastdata: pastdata,
          currentdata: JSON.stringify(currentQuestion),
        },
      })
      .then((response) => {
        setPrediction(response.data.prediction);
        setLoadingPrediction(false);
      })
      .catch((error) => {
        console.error("Error generating prediction:", error);
        setLoadingPrediction(false);
      });
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Your Score: {score} out of {questions.length}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
        </Box>

        {loadingFeedback ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              padding: 2,
              marginBottom: 4,
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>
              Performance Feedback:
            </Typography>
            {/* <Typist
              cursor={{
                show: true,
                blink: true,
                element: "|",
                hideWhenDone: true,
              }}
              avgTypingDelay={20}
              startDelay={300}
              
            > */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {feedback}
            </Typography>
            {/* </Typist> */}
          </Box>
        )}

        {questions.map((question, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 3,
              borderRadius: "8px",
              backgroundColor: "#fffaf0",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2, color: "#1976d2" }}
              >
                {index + 1}. {question.question}
              </Typography>
              <RadioGroup value={question.user_response || ""}>
                {["option_a", "option_b", "option_c", "option_d"].map(
                  (option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio disabled />}
                      label={question[option]}
                      sx={{ textAlign: "left", marginLeft: 0 }}
                    />
                  )
                )}
              </RadioGroup>
              <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                Correct Answer: {question.correct_answer}
              </Typography>
              <Typography>
                Your Response:{" "}
                {question.user_response
                  ? question.user_response?.replace("option_", "")
                  : "Skipped"}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginTop: 1,
                  color:
                    question.user_response?.replace("option_", "") ===
                    question.correct_answer?.replace("option_", "")
                      ? "green"
                      : "red",
                }}
              >
                {question.user_response?.replace("option_", "") ===
                question.correct_answer
                  ? "Correct"
                  : question.user_response
                  ? "Wrong"
                  : "Skipped"}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Explanation: {question.explanation}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  marginTop: 2,
                  transition: "background-color 0.3s",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={() => handleGeneratePrediction(question)}
              >
                Generate Prediction
              </Button>
            </CardContent>
          </Card>
        ))}

        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "80%",
                padding: 4,
                borderRadius: 4,
                position: "relative",
                boxShadow: 24,
                background: "linear-gradient(135deg, #f0f0f0, #fff)",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 16, right: 16 }}
                onClick={() => setShowModal(false)}
              >
                <CloseIcon />
              </IconButton>
              {loadingPrediction ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Typography id="modal-modal-description">
                  {prediction}
                </Typography>
              )}
            </Box>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
};

export default Results;
