// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Modal,
//   CircularProgress,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   IconButton,
//   Paper,
//   Divider,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { auth, db } from "./firebase";
// import "./Results.css"; // New CSS file for typing effect
// import Typist from "react-typist";

// const Results = () => {
//   const location = useLocation();
//   const { questions, score } = location.state;
//   const [feedback, setFeedback] = useState("");
//   const [loadingFeedback, setLoadingFeedback] = useState(true);
//   const [loadingPrediction, setLoadingPrediction] = useState(false);
//   const [prediction, setPrediction] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [pastdata, setPastData] = useState("");
//   const [showTypingEffect, setShowTypingEffect] = useState(false);

//   const generateResultsSummary = (questions) => {
//     return questions
//       .map((question) => {
//         let result;
//         if (!question.user_response) {
//           result = "skipped";
//         } else if (
//           question.user_response?.replace("option_", "") ===
//           question.correct_answer?.replace("option_", "")
//         ) {
//           result = "correct";
//         } else {
//           result = "wrong";
//         }
//         return `${question.categories.join(",")} (${result})`;
//       })
//       .join(", ");
//   };
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Scroll to the top of the page whenever the pathname changes
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     const topic = generateResultsSummary(questions);
//     db.collection("UsersTestData")
//       .doc(auth?.currentUser?.uid)
//       .collection("usersdata")
//       .add({ testSummary: topic, createdOn: new Date() })
//       .then((res) => console.log(res))
//       .catch((err) => console.error(err));

//     axios
//       .get("http://localhost:8000/gemini_performanceanalysis", {
//         params: { topic },
//       })
//       .then((response) => {
//         setFeedback(response.data.feedback);
//         setLoadingFeedback(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching the feedback:", error);
//         setLoadingFeedback(false);
//       });
//   }, [score, questions.length]);

//   useEffect(() => {
//     db.collection("UsersTestData")
//       .doc(auth?.currentUser?.uid)
//       .collection("usersdata")
//       .onSnapshot((snapshot) => {
//         let combined = "";
//         snapshot.docs.map((snap) => (combined += snap.data().testSummary));
//         setPastData(combined);
//       });
//   }, []);
//   useEffect(() => {
//     if (!loadingFeedback && feedback) {
//       setShowTypingEffect(true); // Trigger Typist when feedback is ready
//     }
//   }, [loadingFeedback, feedback]);
//   const handleGeneratePrediction = (currentQuestion) => {
//     setLoadingPrediction(true);
//     setShowModal(true);

//     axios
//       .get("http://localhost:8000/gemini_prediction", {
//         params: {
//           pastdata: pastdata,
//           currentdata: JSON.stringify(currentQuestion),
//         },
//       })
//       .then((response) => {
//         setPrediction(response.data.prediction);
//         setLoadingPrediction(false);
//       })
//       .catch((error) => {
//         console.error("Error generating prediction:", error);
//         setLoadingPrediction(false);
//       });
//   };

//   return (
//     <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
//       <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
//         <Box sx={{ textAlign: "center", marginBottom: 4 }}>
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold", color: "#1976d2" }}
//           >
//             Your Score: {score} out of {questions.length}
//           </Typography>
//           <Divider sx={{ marginY: 2 }} />
//         </Box>

//         {loadingFeedback ? (
//           <Box
//             sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               padding: 2,
//               marginBottom: 4,
//               backgroundColor: "#f9f9f9",
//               borderRadius: "8px",
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>
//               Performance Feedback:
//             </Typography>
//             {/* <Typist
//               cursor={{
//                 show: true,
//                 blink: true,
//                 element: "|",
//                 hideWhenDone: true,
//               }}
//               avgTypingDelay={20}
//               startDelay={300}

//             > */}
//             <Typography variant="body1" sx={{ marginTop: 2 }}>
//               {feedback}
//             </Typography>
//             {/* </Typist> */}
//           </Box>
//         )}

//         {questions.map((question, index) => (
//           <Card
//             key={index}
//             sx={{
//               marginBottom: 3,
//               borderRadius: "8px",
//               backgroundColor: "#fffaf0",
//               transition: "transform 0.3s",
//               "&:hover": { transform: "scale(1.02)" },
//             }}
//           >
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", marginBottom: 2, color: "#1976d2" }}
//               >
//                 {index + 1}. {question.question}
//               </Typography>
//               <RadioGroup value={question.user_response || ""}>
//                 {["option_a", "option_b", "option_c", "option_d"].map(
//                   (option) => (
//                     <FormControlLabel
//                       key={option}
//                       value={option}
//                       control={<Radio disabled />}
//                       label={question[option]}
//                       sx={{ textAlign: "left", marginLeft: 0 }}
//                     />
//                   )
//                 )}
//               </RadioGroup>
//               <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
//                 Correct Answer: {question.correct_answer}
//               </Typography>
//               <Typography>
//                 Your Response:{" "}
//                 {question.user_response
//                   ? question.user_response?.replace("option_", "")
//                   : "Skipped"}
//               </Typography>
//               <Typography
//                 sx={{
//                   fontWeight: "bold",
//                   marginTop: 1,
//                   color:
//                     question.user_response?.replace("option_", "") ===
//                     question.correct_answer?.replace("option_", "")
//                       ? "green"
//                       : "red",
//                 }}
//               >
//                 {question.user_response?.replace("option_", "") ===
//                 question.correct_answer
//                   ? "Correct"
//                   : question.user_response
//                   ? "Wrong"
//                   : "Skipped"}
//               </Typography>
//               <Typography variant="body2" sx={{ marginTop: 1 }}>
//                 Explanation: {question.explanation}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 sx={{
//                   marginTop: 2,
//                   transition: "background-color 0.3s",
//                   "&:hover": { backgroundColor: "#1565c0" },
//                 }}
//                 onClick={() => handleGeneratePrediction(question)}
//               >
//                 Generate Prediction
//               </Button>
//             </CardContent>
//           </Card>
//         ))}

//         <Modal
//           open={showModal}
//           onClose={() => setShowModal(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100vh",
//               position: "relative",
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 width: "80%",
//                 padding: 4,
//                 borderRadius: 4,
//                 position: "relative",
//                 boxShadow: 24,
//                 background: "linear-gradient(135deg, #f0f0f0, #fff)",
//               }}
//             >
//               <IconButton
//                 sx={{ position: "absolute", top: 16, right: 16 }}
//                 onClick={() => setShowModal(false)}
//               >
//                 <CloseIcon />
//               </IconButton>
//               {loadingPrediction ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100%",
//                   }}
//                 >
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <Typography id="modal-modal-description">
//                   {prediction}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Modal>
//       </Paper>
//     </Container>
//   );
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
  Grid,
  useTheme,
  alpha,
  Chip,
  LinearProgress,
  Tooltip,
  Zoom,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TimelineIcon from "@mui/icons-material/Timeline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { auth, db } from "./firebase";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const { questions, score } = location.state;
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pastdata, setPastData] = useState("");
  const [currentQuestionForPrediction, setCurrentQuestionForPrediction] =
    useState(null);
  const [scrollToTop, setScrollToTop] = useState(false);
  const theme = useTheme();

  // Calculate percentage score
  const percentage = Math.round((score / questions.length) * 100);

  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { text: "Excellent", color: "#4caf50" };
    if (percentage >= 70) return { text: "Good", color: "#8bc34a" };
    if (percentage >= 50) return { text: "Average", color: "#ff9800" };
    return { text: "Needs Improvement", color: "#f44336" };
  };

  const performanceLevel = getPerformanceLevel();

  // Count correct, wrong, and skipped questions
  const stats = questions.reduce(
    (acc, question) => {
      if (!question.user_response) {
        acc.skipped++;
      } else if (
        question.user_response?.replace("option_", "") ===
        question.correct_answer
      ) {
        acc.correct++;
      } else {
        acc.wrong++;
      }
      return acc;
    },
    { correct: 0, wrong: 0, skipped: 0 }
  );

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

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save test data and get feedback
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

  // Get past user data
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

  const handleGeneratePrediction = (currentQuestion) => {
    setLoadingPrediction(true);
    setShowModal(true);
    setCurrentQuestionForPrediction(currentQuestion);

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to convert option_a to A, option_b to B, etc.
  const formatOptionLabel = (option) => {
    if (!option) return "Not answered";
    return option.replace("option_", "").toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Score Header with Animation */}
        <Box
          sx={{
            p: 5,
            textAlign: "center",
            backgroundImage: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              0.4
            )} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
            position: "relative",
            overflow: "hidden",
            color: "white",
          }}
        >
          <Box
            className="score-glow"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 220,
              height: 220,
              borderRadius: "50%",
              backgroundColor: alpha("#fff", 0.1),
              filter: "blur(20px)",
              animation: "pulse 3s infinite",
            }}
          />

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
            Your Quiz Results
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                backgroundColor: "white",
                color: performanceLevel.color,
                fontSize: "2.5rem",
                fontWeight: "bold",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              {percentage}%
            </Avatar>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {performanceLevel.text}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 500, mt: 1 }}>
            {score} out of {questions.length} correct
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Chip
              icon={<CheckCircleIcon />}
              label={`${stats.correct} Correct`}
              sx={{
                bgcolor: alpha("#4caf50", 0.9),
                color: "white",
                fontWeight: "bold",
                px: 1,
              }}
            />
            <Chip
              icon={<CancelIcon />}
              label={`${stats.wrong} Wrong`}
              sx={{
                bgcolor: alpha("#f44336", 0.9),
                color: "white",
                fontWeight: "bold",
                px: 1,
              }}
            />
            <Chip
              icon={<HelpOutlineIcon />}
              label={`${stats.skipped} Skipped`}
              sx={{
                bgcolor: alpha("#ff9800", 0.9),
                color: "white",
                fontWeight: "bold",
                px: 1,
              }}
            />
          </Box>
        </Box>

        {/* Performance Feedback Section */}
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <EmojiEventsIcon
              sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1.5 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", color: theme.palette.primary.main }}
            >
              Performance Analysis
            </Typography>
          </Box>

          {loadingFeedback ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <CircularProgress size={60} thickness={5} />
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                Analyzing your performance...
              </Typography>
            </Box>
          ) : (
            <Card
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundImage: `linear-gradient(135deg, ${alpha(
                  theme.palette.background.paper,
                  0.8
                )} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: `0 4px 20px ${alpha(
                  theme.palette.primary.main,
                  0.15
                )}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <LightbulbIcon sx={{ color: "orange", mr: 1 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Personalized Insights
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  animation: "fadeIn 1s ease-in",
                }}
              >
                {feedback}
              </Typography>
            </Card>
          )}
        </Box>

        {/* Questions Review Section */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <HelpOutlineIcon
              sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1.5 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", color: theme.palette.primary.main }}
            >
              Question Review
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {questions.map((question, index) => {
              const isCorrect =
                question.user_response?.replace("option_", "") ===
                question.correct_answer;
              const isSkipped = !question.user_response;

              return (
                <Grid item xs={12} key={index}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                      },
                      border: `1px solid ${
                        isCorrect
                          ? alpha("#4caf50", 0.3)
                          : isSkipped
                          ? alpha("#ff9800", 0.3)
                          : alpha("#f44336", 0.3)
                      }`,
                    }}
                  >
                    {/* Status Bar */}
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: isCorrect
                          ? "#4caf50"
                          : isSkipped
                          ? "#ff9800"
                          : "#f44336",
                      }}
                    />

                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: 40,
                                height: 40,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.1
                                ),
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                                fontSize: "1.25rem",
                                mr: 2,
                                mt: 0.5,
                              }}
                            >
                              {index + 1}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                                color: "text.primary",
                                lineHeight: 1.4,
                              }}
                            >
                              {question.question}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mb: 3,
                              ml: 7,
                            }}
                          >
                            {question.categories.map((category, i) => (
                              <Chip
                                key={i}
                                label={category}
                                size="small"
                                sx={{
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  color: theme.palette.primary.main,
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                          <Box sx={{ ml: { xs: 0, sm: 7 } }}>
                            <RadioGroup value={question.user_response || ""}>
                              {[
                                "option_a",
                                "option_b",
                                "option_c",
                                "option_d",
                              ].map((option, i) => {
                                const isUserChoice =
                                  question.user_response === option;
                                const isCorrectAnswer =
                                  option.replace("option_", "") ===
                                  question.correct_answer;

                                let bgColor = "transparent";
                                if (isCorrectAnswer) {
                                  bgColor = alpha("#4caf50", 0.1);
                                } else if (isUserChoice && !isCorrectAnswer) {
                                  bgColor = alpha("#f44336", 0.1);
                                }

                                return (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={
                                      <Radio
                                        disabled
                                        color={
                                          isCorrectAnswer
                                            ? "success"
                                            : isUserChoice
                                            ? "error"
                                            : "primary"
                                        }
                                        checked={isUserChoice}
                                      />
                                    }
                                    label={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            fontWeight:
                                              isCorrectAnswer || isUserChoice
                                                ? "bold"
                                                : "normal",
                                          }}
                                        >
                                          <Box
                                            component="span"
                                            sx={{
                                              color: theme.palette.primary.main,
                                              mr: 1,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {String.fromCharCode(65 + i)}:
                                          </Box>
                                          {question[option]}
                                        </Typography>
                                        {isCorrectAnswer && (
                                          <CheckCircleIcon
                                            fontSize="small"
                                            sx={{ ml: 1, color: "#4caf50" }}
                                          />
                                        )}
                                        {isUserChoice && !isCorrectAnswer && (
                                          <CancelIcon
                                            fontSize="small"
                                            sx={{ ml: 1, color: "#f44336" }}
                                          />
                                        )}
                                      </Box>
                                    }
                                    sx={{
                                      mx: 0,
                                      p: 1.5,
                                      borderRadius: 1,
                                      backgroundColor: bgColor,
                                      mb: 1,
                                      width: "100%",
                                      border: `1px solid ${
                                        isCorrectAnswer
                                          ? alpha("#4caf50", 0.3)
                                          : isUserChoice
                                          ? alpha("#f44336", 0.3)
                                          : alpha(theme.palette.divider, 0.5)
                                      }`,
                                    }}
                                  />
                                );
                              })}
                            </RadioGroup>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              height: "100%",
                              backgroundColor: alpha(
                                theme.palette.background.paper,
                                0.6
                              ),
                              border: `1px solid ${alpha(
                                theme.palette.divider,
                                0.5
                              )}`,
                            }}
                          >
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Your Answer:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: "bold",
                                  color: isCorrect
                                    ? "#4caf50"
                                    : isSkipped
                                    ? "#ff9800"
                                    : "#f44336",
                                }}
                              >
                                {isSkipped
                                  ? "Not answered"
                                  : formatOptionLabel(question.user_response)}
                              </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Correct Answer:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: "bold",
                                  color: "#4caf50",
                                }}
                              >
                                {formatOptionLabel(
                                  "option_" + question.correct_answer
                                )}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Status:
                              </Typography>
                              <Chip
                                label={
                                  isCorrect
                                    ? "Correct"
                                    : isSkipped
                                    ? "Skipped"
                                    : "Incorrect"
                                }
                                size="small"
                                sx={{
                                  bgcolor: isCorrect
                                    ? alpha("#4caf50", 0.1)
                                    : isSkipped
                                    ? alpha("#ff9800", 0.1)
                                    : alpha("#f44336", 0.1),
                                  color: isCorrect
                                    ? "#4caf50"
                                    : isSkipped
                                    ? "#ff9800"
                                    : "#f44336",
                                  fontWeight: "bold",
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />

                          <Box sx={{ ml: { xs: 0, sm: 7 } }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              Explanation:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", mb: 3 }}
                            >
                              {question.explanation}
                            </Typography>

                            <Button
                              variant="outlined"
                              color="secondary"
                              startIcon={<TimelineIcon />}
                              onClick={() => handleGeneratePrediction(question)}
                              sx={{
                                borderRadius: 6,
                                px: 3,
                                py: 1,
                                fontWeight: "medium",
                                transition: "all 0.3s",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                },
                              }}
                            >
                              Generate Prediction
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Paper>

      {/* Prediction Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Zoom in={showModal}>
          <Box
            sx={{
              width: { xs: "90%", sm: "80%", md: "70%" },
              maxHeight: "90vh",
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: { xs: 3, sm: 4 },
              outline: "none",
              position: "relative", // Changed from absolute
              maxWidth: "800px", // Added max width to prevent extreme widths
              m: 2, // Added margin for safety
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: alpha(theme.palette.grey[200], 0.5),
                "&:hover": {
                  bgcolor: alpha(theme.palette.grey[300], 0.5),
                },
              }}
              onClick={() => setShowModal(false)}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: theme.palette.primary.main,
                pb: 1,
                borderBottom: `2px solid ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
              }}
            >
              Learning Prediction
            </Typography>

            {currentQuestionForPrediction && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Based on Question:
                </Typography>
                <Typography variant="body2">
                  {currentQuestionForPrediction.question}
                </Typography>
              </Box>
            )}

            {loadingPrediction ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <CircularProgress size={60} thickness={5} sx={{ mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  Generating your personalized prediction...
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "text.secondary", mt: 1 }}
                >
                  Analyzing your performance patterns and learning profile
                </Typography>
              </Box>
            ) : (
              <Box sx={{ animation: "fadeIn 0.5s ease-out" }}>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {prediction}
                </Typography>
              </Box>
            )}
          </Box>
        </Zoom>
      </Modal>

      {/* Scroll to Top Button */}
      <Zoom in={scrollToTop}>
        <Box
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 2,
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Box>
      </Zoom>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Container>
  );
};

export default Results;
