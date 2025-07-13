import { Box, Typography, Grid, Stack, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface updateDetails {
  title: string;
  synopsis: string;
  content: string;
}

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-blog"],
    mutationFn: async (newDetails: updateDetails) => {
      const response = await axiosInstance.patch(
        `/api/blogs/${blogId}`,
        newDetails
      );
      return response.data;
    },
    onError: () => {
      toast("Error updating blog", {
        style: { backgroundColor: "red", color: "white" },
      });
    },
    onSuccess: () => {
      toast("Blog updated successfully", {
        style: { backgroundColor: "greenyellow", color: "white" },
      });
      navigate("/blogs");
    },
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["get-blog-for-update"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`);
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setSynopsis(data.synopsis);
      setContent(data.content);
    }
  }, [data]);

  if (isLoading) {
    return <Loader message="Loading blog please wait..." />;
  }

  if (isError) {
    return (
      <Stack component="section" p={4}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Something Went Wrong
        </Typography>
      </Stack>
    );
  }

  function handleUpdateBlog() {
    const updateDetails = { title, synopsis, content };
    mutate(updateDetails);
  }

  return (
    <Box component="section" px={3} py={6}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        fontStyle="italic"
      >
        Update Blog
      </Typography>

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
          <Stack
            component="form"
            spacing={3}
            sx={{
              backgroundColor: "white-smoke",
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              variant="filled"
              fullWidth
              required
              label="New Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              variant="filled"
              fullWidth
              required
              label="New Synopsis"
              multiline
              minRows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />

            <TextField
              variant="filled"
              fullWidth
              required
              label="New Content"
              multiline
              minRows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                size="large"
                fullWidth
                loading={isPending}
                onClick={handleUpdateBlog}
              >
                Update Blog
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UpdateBlog;
