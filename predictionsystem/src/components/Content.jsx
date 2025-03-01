// import React from "react";
// import { Grid, Typography, IconButton, Card, CardContent } from "@mui/material";
// // icons
// import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
// import LocalParkingIcon from "@mui/icons-material/LocalParking";
// import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
// import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
// import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
// import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
// // components
// import Title from "./Title";
// import Paragraph from "./Paragraph";
// import { useNavigate } from "react-router-dom";

// const Content = () => {
//   const navigate = useNavigate();
//   return (
//     <Grid
//       container
//       spacing={0}
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         py: 10,
//         px: 2,
//       }}
//     >
//       <Grid item xs={12} sm={12} md={5} component="section">
//         <Title text={"What we are offering?"} textAlign={"start"} />

//         <Typography
//           variant="h6"
//           component="h4"
//           sx={{
//             fontWeight: "400",
//             paddingTop: 1,
//           }}
//         >
//           Books Available to take test
//         </Typography>

//         <Paragraph
//           text={
//             " Our AI has garnered much intelligence and has got expertise in generating exam grade questions and also take care of the minute details or the concepts in the books."
//           }
//           maxWidth={"75%"}
//           mx={0}
//           textAlign={"start"}
//         />
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           square={true}
//           sx={{
//             minHeight: 200,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             border: "1px solid #ccc",
//           }}
//         >
//           <CardContent>
//             <IconButton
//               onClick={() => {
//                 navigate(
//                   `/quiz?prompt=${encodeURIComponent(
//                     "Generate 10 questions cyber security from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
//                   )}&type=pdf`
//                 );
//               }}
//             >
//               <SportsGymnasticsIcon fontSize="large" color="secondary" />
//             </IconButton>
//             <Typography
//               variant="h5"
//               component="p"
//               sx={{
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             >
//               Cyber Security
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           square={true}
//           sx={{
//             minHeight: 200,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             border: "1px solid #ccc",
//           }}
//         >
//           <CardContent>
//             <IconButton
//               onClick={() => {
//                 navigate(
//                   `/quiz?prompt=${encodeURIComponent(
//                     "Generate 10 questions cloud computing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
//                   )}&type=pdf`
//                 );
//               }}
//             >
//               <LocalParkingIcon fontSize="large" color="secondary" />
//             </IconButton>
//             <Typography
//               variant="h5"
//               component="p"
//               sx={{
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             >
//               Cloud Computing
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={2}
//         sx={{
//           display: { xs: "none", sm: "block" },
//         }}
//       >
//         <Card
//           square={true}
//           sx={{
//             boxShadow: "none",
//             minHeight: 180,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//           }}
//         >
//           <CardContent>
//             <ArrowCircleRightRoundedIcon fontSize="large" color="secondary" />
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           square={true}
//           sx={{
//             minHeight: 200,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             border: "1px solid #ccc",
//           }}
//         >
//           <CardContent>
//             <IconButton
//               onClick={() => {
//                 navigate(
//                   `/quiz?prompt=${encodeURIComponent(
//                     "Generate 10 questions web designing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
//                   )}&type=pdf`
//                 );
//               }}
//             >
//               <FastfoodOutlinedIcon fontSize="large" color="secondary" />
//             </IconButton>
//             <Typography
//               variant="h5"
//               component="p"
//               sx={{
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             >
//               Web Designing
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           square={true}
//           sx={{
//             minHeight: 200,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             border: "1px solid #ccc",
//           }}
//         >
//           <CardContent>
//             <IconButton
//               onClick={() => {
//                 navigate(
//                   `/quiz?prompt=${encodeURIComponent(
//                     "Generate 10 questions GENERAL BACTERIOLOGY,Microbial growth,Microbial metabolism, bacterial infections, key concepts related to bacteria, allergies, medications, immunity, antibiotics , vaccination and other key medical and bacteria reated topics from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
//                   )}&type=pdf`
//                 );
//               }}
//             >
//               <PoolOutlinedIcon fontSize="large" color="secondary" />
//             </IconButton>
//             <Typography
//               variant="h5"
//               component="p"
//               sx={{
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             >
//               Biology
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           square={true}
//           sx={{
//             minHeight: 200,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             border: "1px solid #ccc",
//           }}
//         >
//           <CardContent>
//             <IconButton
//               onClick={() => {
//                 navigate(
//                   `/quiz?prompt=${encodeURIComponent(
//                     "Generate 10 questions of dot net from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
//                   )}&type=pdf`
//                 );
//               }}
//             >
//               <WifiPasswordIcon fontSize="large" color="secondary" />
//             </IconButton>
//             <Typography
//               variant="h5"
//               component="p"
//               sx={{
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             >
//               Dot Net
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default Content;





import React, { useState } from "react";
import { Grid, Typography, IconButton, Card, CardContent, Button, Box, Tab, Tabs } from "@mui/material";
// icons
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// components
import Title from "./Title";
import Paragraph from "./Paragraph";
import { useNavigate } from "react-router-dom";
import PdfUploadSection from "./PdfUploadSection"; // Import the new component

// TabPanel component for switching between tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Content = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 5,
        px: 2,
      }}
    >
      <Grid item xs={12} sm={12} md={10} component="section">
        <Title text={"What we are offering?"} textAlign={"center"} />

        <Typography
          variant="h6"
          component="h4"
          sx={{
            fontWeight: "400",
            paddingTop: 1,
            textAlign: "center",
            mb: 3,
          }}
        >
          Take practice tests and upload your own content
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Available Practice Tests" />
            <Tab label="Upload Your Own Content" icon={<UploadFileIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Paragraph
            text={
              "Our AI has garnered much intelligence and has got expertise in generating exam grade questions and also take care of the minute details or the concepts in the books."
            }
            maxWidth={"100%"}
            mx={0}
            textAlign={"center"}
          />

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/quiz?prompt=${encodeURIComponent(
                          "Generate 10 questions cyber security from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
                        )}&type=pdf`
                      );
                    }}
                  >
                    <SportsGymnasticsIcon fontSize="large" color="secondary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Cyber Security
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/quiz?prompt=${encodeURIComponent(
                          "Generate 10 questions cloud computing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
                        )}&type=pdf`
                      );
                    }}
                  >
                    <LocalParkingIcon fontSize="large" color="secondary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Cloud Computing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/quiz?prompt=${encodeURIComponent(
                          "Generate 10 questions web designing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
                        )}&type=pdf`
                      );
                    }}
                  >
                    <FastfoodOutlinedIcon fontSize="large" color="secondary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Web Designing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/quiz?prompt=${encodeURIComponent(
                          "Generate 10 questions GENERAL BACTERIOLOGY,Microbial growth,Microbial metabolism, bacterial infections, key concepts related to bacteria, allergies, medications, immunity, antibiotics , vaccination and other key medical and bacteria reated topics from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
                        )}&type=pdf`
                      );
                    }}
                  >
                    <PoolOutlinedIcon fontSize="large" color="secondary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Biology
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/quiz?prompt=${encodeURIComponent(
                          "Generate 10 questions of dot net from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context"
                        )}&type=pdf`
                      );
                    }}
                  >
                    <WifiPasswordIcon fontSize="large" color="secondary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Dot Net
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                square={true}
                sx={{
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                  bgcolor: "#f5f5f5",
                }}
              >
                <CardContent>
                  <IconButton onClick={() => setTabValue(1)}>
                    <UploadFileIcon fontSize="large" color="primary" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Upload Your PDF
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Create custom tests from your own materials
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <PdfUploadSection />

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => setTabValue(0)}
              sx={{ mx: 1 }}
            >
              Back to Practice Tests
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/my-pdfs')}
              sx={{ mx: 1 }}
            >
              View My Uploaded PDFs
            </Button>
          </Box>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default Content;