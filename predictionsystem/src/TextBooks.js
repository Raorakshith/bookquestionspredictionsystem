import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "1",
    name: "cyber security",
    image:
      "https://img.freepik.com/free-vector/book-with-bookmark_24911-115897.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    prompt:
      "Generate 10 questions cyber security from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
  {
    id: "2",
    name: "cloud computing",
    image:
      "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    prompt:
      "Generate 10 questions cloud computing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
  {
    id: "3",
    name: "web designing",
    prompt:
      "Generate 10 questions cyber security from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",

    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    prompt:
      "Generate 10 questions web designing from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
  {
    id: "4",
    name: "biology",
    image:
      "https://img.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    prompt:
      "Generate 10 questions GENERAL BACTERIOLOGY,Microbial growth,Microbial metabolism, bacterial infections, key concepts related to bacteria, allergies, medications, immunity, antibiotics , vaccination and other key medical and bacteria reated topics from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
  {
  
      id: "5",
      name: "dot net ",
      image:
        "https://img.freepik.com/free-psd/hardcover-book-mockup_1332-60611.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
      prompt:
        "Generate 10 questions of dot net from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
    
  //  id: "5",
    //name: "maths ",
    //image:
      //"https://img.freepik.com/free-psd/hardcover-book-mockup_1332-60611.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    //prompt:
      //"Generate 10 questions on trigonometry calculations, angular calculations and other key trigonometric concepts from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
  {
    id: "6",
    name: "Block Chain ",
    image:
      "https://img.freepik.com/free-psd/hardcover-book-mockup_1332-60611.jpg?ga=GA1.1.791319708.1710404174&semt=sph",
    prompt:
      "Generate 10 questions on Creating digital money without central banks and Equilibrium mechanisms in the bitcoin market concepts from the data provided in your context. Note that the questions should be complex and cover wider areas and topics ppresent in the context",
  },
];
const TextBooks = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 10,
        margin: 10,
      }}
    >
      {data.map((item, index) => {
        return (
          <>
            <Card
              sx={{ maxWidth: 345, borderRadius: 8 }}
              key={item.id}
              elevation={5}
              onClick={() => {
                navigate(
                  `/quiz?prompt=${encodeURIComponent(item.prompt)}&type=pdf`
                );
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={item.image}
                title="text-books"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </>
        );
      })}
    </div>
  );
};
export default TextBooks;
