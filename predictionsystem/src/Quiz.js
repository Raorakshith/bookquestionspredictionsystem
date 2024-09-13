// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Container, CircularProgress, Box } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Quiz = () => {
//     const [questions, setQuestions] = useState([]);
//     const [responses, setResponses] = useState({});
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const prompt = queryParams.get('prompt');
//     const type = queryParams.get('type');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if(type==="pdf"){
//             axios.post('http://localhost:8000/generate_question/invoke',{
//                 input: prompt?prompt:"Generate 10 questions from the context. note that the questions should be multiple statements wise"
//             }).then(response=>{
//                 let rawAnswer = response.data.output.answer;

//                 // Clean the rawAnswer string
//                 rawAnswer = rawAnswer.replace("`", "");
//                 rawAnswer = rawAnswer.replace(/\n/g, "");
//                 rawAnswer = rawAnswer.replace(/\\/g, "");
//                 rawAnswer = rawAnswer.replace("json", "");

//                 // Parse the cleaned string to a JSON array
//                 let formattedAnswer;

//                 try {
//                     formattedAnswer = JSON.parse(rawAnswer);
//                 } catch (error) {
//                     console.error('Error parsing JSON:', error);
//                     formattedAnswer = [];
//                 }

//                 // Use the formattedAnswer as needed
//                 console.log(formattedAnswer);
//                 const mappedQuestions = formattedAnswer.map(q => ({
//                     question: q.questions,
//                     option_a: q.options.a,
//                     option_b: q.options.b,
//                     option_c: q.options.c,
//                     option_d: q.options.d,
//                     correct_answer: q.correctanswer,
//                     explanation: q.explanation,
//                     categories: [q.categories]
//                 }));

//                 setQuestions(mappedQuestions);
//                 setLoading(false);
//             })
//         }else{
//         axios.get('http://localhost:8000/gemini_generatequestions', {
//             params: {
//                 topic: prompt ? prompt : "generate 10 questions on Aerospace engineering fluids dynamics for GATE exams"
//             }
//         })
//             .then(response => {
//                 setQuestions(response.data.questions);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching the questions:', error);
//                 setLoading(false);
//             });
//         }
//     }, []);

//     const handleOptionChange = (questionIndex, option) => {
//         const updatedQuestions = questions.map((question, index) => {
//             if (index === questionIndex) {
//                 return {
//                     ...question,
//                     user_response: option
//                 };
//             }
//             return question;
//         });

//         console.log(updatedQuestions)
//         setQuestions(updatedQuestions);
//     };

//     const handleSubmit = () => {
//         let score = 0;
//         questions.forEach((question) => {
//             if ((question.user_response?.replace('option_','')) === question.correct_answer) {
//                 score++;
//             }
//         });
//         navigate('/results', { state: { questions, score } });
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Container>
//             {questions.map((question, index) => (
//                 <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
//                     <CardContent>
//                         <Typography variant="h6">{question.question}</Typography>
//                         <FormControl component="fieldset">
//                             <RadioGroup
//                                 value={question.user_response || ''}
//                                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                             >
//                                 {['option_a', 'option_b', 'option_c', 'option_d'].map((option) => (
//                                     <FormControlLabel
//                                         key={option}
//                                         value={option}
//                                         control={<Radio />}
//                                         label={question[option]}
//                                     />
//                                 ))}
//                             </RadioGroup>
//                         </FormControl>
//                     </CardContent>
//                 </Card>
//             ))}
//             <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//             {/* {result !== null && (
//                 <Typography variant="h5" sx={{ marginTop: 2 }}>
//                     You scored: {result} out of {questions.length}
//                 </Typography>
//             )} */}
//         </Container>
//     );
// };

// export default Quiz;

import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FaceRecognition from "./components/FaceRecognition";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get("prompt");
  const type = queryParams.get("type");
  const navigate = useNavigate();

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
  }, []);

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5", // Add a soft background color for better contrast
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{ color: "#1976d2", marginBottom: 2 }} // Slightly larger spinner with primary color
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#555",
            animation: "fadeIn 1.5s ease-in-out infinite", // Fading effect
            marginTop: 2,
          }}
        >
          Generating Questions...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          Quiz Time!
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 3 }}
          align="center"
        >
          Test your knowledge by answering the following multiple-choice
          questions. Select the most appropriate answer for each question.
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: 80,
            position:'absolute',
            right:8,
            top:5
          }}
        >
          <FaceRecognition />
        </div>
        {questions.map((question, index) => (
          <Card key={index} variant="outlined" sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "left" }}
              >
                {index + 1}. {question.question}
              </Typography>
              <FormControl
                component="fieldset"
                sx={{ marginTop: 2, textAlign: "left" }}
              >
                <RadioGroup
                  value={question.user_response || ""}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                >
                  {["option_a", "option_b", "option_c", "option_d"].map(
                    (option, i) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={`${String.fromCharCode(65 + i)}. ${
                          question[option]
                        }`}
                        sx={{ textAlign: "left", marginLeft: 0 }}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ padding: 1.5, fontSize: "1rem", fontWeight: "bold" }}
        >
          Submit Your Answers
        </Button>
      </Paper>
    </Container>
  );
};

export default Quiz;
