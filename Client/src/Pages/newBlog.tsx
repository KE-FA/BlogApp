import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface NewBlog {
  title: string;
  synopsis: string;
  content: string;
  imageUrl: string;
}

function NewBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (newBlog: NewBlog) => {
      const response = await axiosInstance.post("/api/blogs", newBlog);
      // console.log(response.data)
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: () => {
      toast("Blog Created successfully", {
        style: {
          backgroundColor: "greenyellow",
          color: "black",
        },
      });
      navigate("/blogs");
    },
  });

  function handleCreateBlog() {
    setFormError("");
    const newBlog = { title, content, synopsis, imageUrl };
    mutate(newBlog);
  }
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Blog
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {formError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Synopsis"
            variant="outlined"
            fullWidth
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />

          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <TextField
            label="Featured Image URL"
            variant="outlined"
            placeholder="Enter the image url"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={handleCreateBlog}
            loading={isPending}
          >
            Create Blog
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewBlog;
