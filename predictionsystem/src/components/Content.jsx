import React from "react";
import { Grid, Typography, IconButton, Card, CardContent } from "@mui/material";
// icons
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
// components
import Title from "./Title";
import Paragraph from "./Paragraph";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
        px: 2,
      }}
    >
      <Grid item xs={12} sm={12} md={5} component="section">
        <Title text={"What we are offering?"} textAlign={"start"} />

        <Typography
          variant="h6"
          component="h4"
          sx={{
            fontWeight: "400",
            paddingTop: 1,
          }}
        >
          Books Available to take test
        </Typography>

        <Paragraph
          text={
            " Our AI has garnered much intelligence and has got expertise in generating exam grade questions and also take care of the minute details or the concepts in the books."
          }
          maxWidth={"75%"}
          mx={0}
          textAlign={"start"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
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

      <Grid item xs={12} sm={6} md={3}>
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

      <Grid
        item
        xs={12}
        sm={6}
        md={2}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <Card
          square={true}
          sx={{
            boxShadow: "none",
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CardContent>
            <ArrowCircleRightRoundedIcon fontSize="large" color="secondary" />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
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

      <Grid item xs={12} sm={6} md={3}>
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

      <Grid item xs={12} sm={6} md={3}>
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
    </Grid>
  );
};

export default Content;
