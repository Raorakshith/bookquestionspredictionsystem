// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Button,
//   Container,
//   CircularProgress,
//   Box,
//   Paper,
//   Divider,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import FaceRecognition from "./components/FaceRecognition";

// const Quiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const prompt = queryParams.get("prompt");
//   const type = queryParams.get("type");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (type === "pdf") {
//       axios
//         .post("http://localhost:8000/generate_question/invoke", {
//           input: prompt
//             ? prompt
//             : "Generate 10 questions from the context. Note that the questions should be multiple-choice.",
//         })
//         .then((response) => {
//           let rawAnswer = response.data.output.answer;

//           rawAnswer = rawAnswer.replace(/`|\n|\\/g, "").replace("json", "");

//           let formattedAnswer;
//           try {
//             formattedAnswer = JSON.parse(rawAnswer);
//           } catch (error) {
//             console.error("Error parsing JSON:", error);
//             formattedAnswer = [];
//           }

//           const mappedQuestions = formattedAnswer.map((q) => ({
//             question: q.questions,
//             option_a: q.options.a,
//             option_b: q.options.b,
//             option_c: q.options.c,
//             option_d: q.options.d,
//             correct_answer: q.correctanswer,
//             explanation: q.explanation,
//             categories: [q.categories],
//           }));

//           setQuestions(mappedQuestions);
//           setLoading(false);
//         });
//     } else {
//       axios
//         .get("http://localhost:8000/gemini_generatequestions", {
//           params: {
//             topic: prompt
//               ? prompt
//               : "generate 10 questions on Aerospace engineering fluids dynamics for GATE exams",
//           },
//         })
//         .then((response) => {
//           setQuestions(response.data.questions);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching the questions:", error);
//           setLoading(false);
//         });
//     }
//   }, []);

//   const handleOptionChange = (questionIndex, option) => {
//     const updatedQuestions = questions.map((question, index) => {
//       if (index === questionIndex) {
//         return {
//           ...question,
//           user_response: option,
//         };
//       }
//       return question;
//     });

//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = () => {
//     let score = 0;
//     questions.forEach((question) => {
//       if (
//         question.user_response?.replace("option_", "") ===
//         question.correct_answer
//       ) {
//         score++;
//       }
//     });
//     navigate("/results", { state: { questions, score }, replace: true });
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           backgroundColor: "#f5f5f5", // Add a soft background color for better contrast
//         }}
//       >
//         <CircularProgress
//           size={60}
//           thickness={5}
//           sx={{ color: "#1976d2", marginBottom: 2 }} // Slightly larger spinner with primary color
//         />
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             color: "#555",
//             animation: "fadeIn 1.5s ease-in-out infinite", // Fading effect
//             marginTop: 2,
//           }}
//         >
//           Generating Questions...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="xl">
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
//         <Typography variant="h2" gutterBottom align="center">
//           Quiz Time!
//         </Typography>
//         <Typography
//           variant="body1"
//           color="textSecondary"
//           sx={{ marginBottom: 3 }}
//           align="center"
//         >
//           Test your knowledge by answering the following multiple-choice
//           questions. Select the most appropriate answer for each question.
//         </Typography>
//         <Divider sx={{ marginBottom: 3 }} />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: 80,
//             height: 80,
//             position:'absolute',
//             right:8,
//             top:5
//           }}
//         >
//           <FaceRecognition />
//         </div>
//         {questions.map((question, index) => (
//           <Card key={index} variant="outlined" sx={{ marginBottom: 3 }}>
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", textAlign: "left" }}
//               >
//                 {index + 1}. {question.question}
//               </Typography>
//               <FormControl
//                 component="fieldset"
//                 sx={{ marginTop: 2, textAlign: "left" }}
//               >
//                 <RadioGroup
//                   value={question.user_response || ""}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                 >
//                   {["option_a", "option_b", "option_c", "option_d"].map(
//                     (option, i) => (
//                       <FormControlLabel
//                         key={option}
//                         value={option}
//                         control={<Radio />}
//                         label={`${String.fromCharCode(65 + i)}. ${
//                           question[option]
//                         }`}
//                         sx={{ textAlign: "left", marginLeft: 0 }}
//                       />
//                     )
//                   )}
//                 </RadioGroup>
//               </FormControl>
//             </CardContent>
//           </Card>
//         ))}
//         <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSubmit}
//           sx={{ padding: 1.5, fontSize: "1rem", fontWeight: "bold" }}
//         >
//           Submit Your Answers
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default Quiz;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Container,
  CircularProgress,
  Box,
  Paper,
  Divider,
  LinearProgress,
  Grid,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get("prompt");
  const type = queryParams.get("type");
  const navigate = useNavigate();
  const theme = useTheme();

  // Format time remaining
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle automatic submission when timer ends
  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [questions]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer countdown effect
  useEffect(() => {
    if (!loading && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !loading) {
      handleTimeUp();
    }
  }, [timeLeft, loading, handleTimeUp]);

  // Fetch questions
  useEffect(() => {
    if (type === "pdf") {
      axios
        .post("http://localhost:8000/generate_question/invoke", {
          input: prompt
            ? prompt
            : "Generate 10 questions from the context. Note that the questions should be multiple-choice.",
        })
        .then((response) => {
          let rawAnswer = response.data.output.answer;
          rawAnswer = rawAnswer.replace(/`|\n|\\/g, "").replace("json", "");

          let formattedAnswer;
          try {
            formattedAnswer = JSON.parse(rawAnswer);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            formattedAnswer = [];
          }

          const mappedQuestions = formattedAnswer.map((q) => ({
            question: q.questions,
            option_a: q.options.a,
            option_b: q.options.b,
            option_c: q.options.c,
            option_d: q.options.d,
            correct_answer: q.correctanswer,
            explanation: q.explanation,
            categories: [q.categories],
          }));

          setQuestions(mappedQuestions);
          setLoading(false);
        });
    } else {
      axios
        .get("http://localhost:8000/gemini_generatequestions", {
          params: {
            topic: prompt
              ? prompt
              : "generate 10 questions on Aerospace engineering fluids dynamics for GATE exams",
          },
        })
        .then((response) => {
          setQuestions(response.data.questions);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the questions:", error);
          setLoading(false);
        });
    }
  }, [prompt, type]);

  const handleOptionChange = (questionIndex, option) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          user_response: option,
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    
    // Add the current question to the set of answered questions
    setAnsweredQuestions(prev => new Set([...prev, questionIndex]));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (
        question.user_response?.replace("option_", "") ===
        question.correct_answer
      ) {
        score++;
      }
    });
    navigate("/results", { state: { questions, score }, replace: true });
  };

  const navigateQuestion = (direction) => {
    const nextQuestion = currentQuestion + direction;
    if (nextQuestion >= 0 && nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <CircularProgress
          size={80}
          thickness={5}
          sx={{ color: theme.palette.primary.main, marginBottom: 3 }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            animation: "pulse 1.5s ease-in-out infinite",
            marginTop: 2,
          }}
        >
          Preparing Your Quiz...
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary" 
          sx={{ marginTop: 1 }}
        >
          Loading questions and setting up your challenge
        </Typography>
      </Box>
    );
  }

  // Calculate timer percentage for progress bar
  const timerPercentage = (timeLeft / (10 * 60)) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2,
          position: "relative",
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
          backgroundSize: "cover",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
        }}
      >
        {/* Timer Display */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: 20,
            backgroundColor: timeLeft < 60 ? "#f44336" : timeLeft < 180 ? "#ff9800" : theme.palette.primary.main,
            color: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            animation: timeLeft < 60 ? "pulse 1s infinite" : "none",
          }}
        >
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="span" fontWeight="bold">
            {formatTime(timeLeft)}
          </Typography>
        </Box>

        {/* Quiz Header */}
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 700, 
            color: theme.palette.primary.main,
            mb: 1
          }}
        >
          Quiz Challenge
        </Typography>
        
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 3, maxWidth: "80%", mx: "auto" }}
          align="center"
        >
          Answer all questions before the timer ends. Good luck!
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Timer Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={timerPercentage} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: alpha(theme.palette.grey[300], 0.5),
              '& .MuiLinearProgress-bar': {
                backgroundColor: timeLeft < 60 
                  ? '#f44336' 
                  : timeLeft < 180 
                    ? '#ff9800' 
                    : theme.palette.primary.main,
                borderRadius: 5,
              }
            }}
          />
        </Box>

        {/* Question Navigation */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
          {questions.map((_, index) => (
            <Chip
              key={index}
              label={index + 1}
              onClick={() => goToQuestion(index)}
              color={index === currentQuestion ? "primary" : "default"}
              icon={answeredQuestions.has(index) ? <CheckCircleIcon /> : <HelpOutlineIcon />}
              variant={index === currentQuestion ? "filled" : "outlined"}
              sx={{ 
                fontWeight: "bold", 
                width: 80,
                height: 36,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                '&:hover': {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }
              }}
            />
          ))}
        </Box>

        {/* Current Question */}
        <Card 
          elevation={4} 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            transition: "all 0.3s ease",
            '&:hover': {
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
            }
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography
              variant="h5"
              sx={{ 
                fontWeight: "600", 
                textAlign: "left",
                color: theme.palette.text.primary,
                mb: 3
              }}
            >
              <Box component="span" sx={{ 
                color: theme.palette.primary.main, 
                display: "inline-block", 
                width: 36, 
                height: 36,
                lineHeight: "36px",
                textAlign: "center",
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                mr: 2
              }}>
                {currentQuestion + 1}
              </Box>
              {questions[currentQuestion]?.question}
            </Typography>
            
            <FormControl
              component="fieldset"
              sx={{ mt: 2, width: "100%" }}
            >
              <RadioGroup
                value={questions[currentQuestion]?.user_response || ""}
                onChange={(e) => handleOptionChange(currentQuestion, e.target.value)}
              >
                <Grid container spacing={2}>
                  {["option_a", "option_b", "option_c", "option_d"].map(
                    (option, i) => (
                      <Grid item xs={12} key={option}>
                        <FormControlLabel
                          value={option}
                          control={
                            <Radio sx={{ 
                              color: theme.palette.primary.main,
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              }
                            }} />
                          }
                          label={
                            <Typography variant="body1">
                              <Box component="span" sx={{ 
                                fontWeight: "bold", 
                                color: theme.palette.primary.main,
                                mr: 1
                              }}>
                                {String.fromCharCode(65 + i)}.
                              </Box> 
                              {questions[currentQuestion]?.[option]}
                            </Typography>
                          }
                          sx={{ 
                            display: "flex",
                            p: 1.5, 
                            m: 0,
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            borderRadius: 1,
                            transition: "all 0.2s ease",
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            ...(questions[currentQuestion]?.user_response === option && {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              borderColor: theme.palette.primary.main,
                            })
                          }}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigateQuestion(-1)}
            disabled={currentQuestion === 0}
            sx={{ 
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold"
            }}
          >
            Previous
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigateQuestion(1)}
            disabled={currentQuestion === questions.length - 1}
            sx={{ 
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold"
            }}
          >
            Next
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ 
            py: 1.8, 
            fontSize: "1.1rem", 
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            '&:hover': {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            }
          }}
        >
          Submit Your Answers
        </Button>
        
        {/* Answered Status */}
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mt: 2 }}
        >
          {answeredQuestions.size} of {questions.length} questions answered
        </Typography>
      </Paper>
    </Container>
  );
};

export default Quiz;