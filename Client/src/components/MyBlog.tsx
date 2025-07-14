import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  CardMedia,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";

type CardProps = {
  blogId: string;
  title: string;
  synopsis: string;
  content: string;
  imageUrl: string;
  isDeleted: boolean;
  authorName: string;
  authorId: string;
  createdAt: string; // <-- New!
};

function Blog({
  blogId,
  title,
  synopsis,
  content,
  imageUrl,
  isDeleted,
  authorName,
  authorId,
  createdAt,
}: CardProps) {
  const { user } = useUser();
  const isOwner = user?.id === authorId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/blogs/${blogId}`);
      return response.data;
    },
    onSuccess: () => {
      toast("Blog Deleted", {
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
    },
    onError: () => {
      toast("Something went wrong", {
        style: { backgroundColor: "red", color: "black" },
      });
    },
  });

  function handleDelete() {
    mutate();
  }

  function handleUpdate() {
    navigate(`/blogs/update/${blogId}`);
  }

  function handleReadMore() {
    navigate(`/blogs/blog/${blogId}`);
  }

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (isDeleted) {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Box
          sx={{
            border: "1px dashed grey",
            borderRadius: 3,
            height: "100%",
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            This blog was deleted.
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={imageUrl || "https://via.placeholder.com/400x200"}
          alt={title}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {synopsis}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {content.length > 10 ? `${content.slice(0, 10)}...` : content}{" "}
            <Link
              component="button"
              variant="body2"
              onClick={handleReadMore}
              sx={{ ml: 1 }}
            >
              Read More
            </Link>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 1 }}>
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">{authorName}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="900"
              >
                {formattedDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
          {isOwner && (
            <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleUpdate}
                sx={{ flexGrow: 1 }}
              >
                Update
              </Button>
              <Button
                color="error"
                size="small"
                variant="outlined"
                onClick={handleDelete}
                disabled={isPending}
                sx={{ flexGrow: 1 }}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Blog;
