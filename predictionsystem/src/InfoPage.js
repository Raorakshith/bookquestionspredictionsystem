import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Fade,
  Grid,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { auth, provider } from "./firebase";
import TextBooks from "./TextBooks";
import { useSpring, animated } from 'react-spring';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InfoPage = () => {
  const [prompt, setPrompt] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  // Animation for appearance
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleGoogleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        const userdata = {
          user_id: res.user.uid,
          user_name: res.additionalUserInfo.profile?.name,
          user_email: res.additionalUserInfo.profile?.email,
        };
        setIsSignedIn(true);
        alert("Successfully signed in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartTest = () => {
    if (prompt.trim() !== "") {
      navigate(`/quiz?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" }}>
      <Container maxWidth="xl" sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!isSignedIn ? (
          // Full-screen sign-in interface with carousel
          <Fade in={!isSignedIn}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%", height: "80%", position: "relative" }}>
              <Box sx={{ textAlign: "center", marginBottom: 4, height: "100%" }}>
                <animated.div style={fadeIn}>
                  <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to the Quiz Platform
                  </Typography>
                  <Typography variant="h6" component="p" gutterBottom>
                    Sign in with Google to start your personalized quiz journey.
                  </Typography>

                  {/* Carousel Section */}
                  <Box sx={{ margin: "20px 0", height: "400px" }}>
                    <Slider {...sliderSettings}>
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbYSm_4Vz4euNrHB06gJAvd8rwg3hbqBVog&s"
                          alt="Slide 1"
                          style={{ width: "100%", height: "400px", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw04wGHutN9plVw5bJkzMFtxpaTYnJVMZjCA&s"
                          alt="Slide 2"
                          style={{ width: "100%", height: "400px", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3uoOceNnEYEqq0ki0om3Wucw77LWx_WiNQ&s"
                          alt="Slide 3"
                          style={{ width: "100%", height: "400px", objectFit: "cover" }}
                        />
                      </div>
                    </Slider>
                  </Box>

                  <GoogleButton
                    onClick={handleGoogleSignIn}
                    style={{ width: "100%", marginTop: "20px" }}
                  />
                  <Box mt={2}>
                    <Typography variant="body1">
                      With our platform, you can generate quizzes based on any topic, helping you study smarter and more efficiently.
                    </Typography>
                  </Box>
                </animated.div>
              </Box>
            </Paper>
          </Fade>
        ) : (
          // Dashboard after sign-in
          <Fade in={isSignedIn}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
              <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <animated.div style={fadeIn}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back to your Quiz Dashboard
                  </Typography>
                  <Typography variant="h6" component="p" gutterBottom>
                    Here you can generate quizzes, explore learning materials, and review your past results.
                  </Typography>
                </animated.div>
              </Box>

              {/* Prompt Input */}
              <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <Typography variant="h5" gutterBottom style={{ fontFamily: "fantasy" }}>
                  Generate a Custom Quiz
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter your prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStartTest}
                  style={{ borderRadius: 16, backgroundColor: "#9900cc" }}
                >
                  Start Test
                </Button>
              </Box>

              {/* Books List Section */}
              <Box mt={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Explore Our Learning Resources
                </Typography>
                <Grid container spacing={2}>
                  <TextBooks />
                </Grid>
              </Box>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default InfoPage;
