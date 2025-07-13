import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  CardMedia,
  Avatar,
  Stack,
} from "@mui/material";

export default function BlogDetails() {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["get-blog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/blogs/blog/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error loading blog
        </Typography>
      </Container>
    );

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container maxWidth="md" sx={{ flex: "1 0 auto", py: 6 }}>
        {data.imageUrl && (
          <CardMedia
            component="img"
            image={data.imageUrl}
            alt={data.title}
            sx={{
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 2,
              mb: 4,
              width: "100%",
            }}
          />
        )}

        <Typography variant="h3" gutterBottom textAlign="center">
          {data.title}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          textAlign="center"
          color="text.secondary"
        >
          {data.synopsis}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          <Avatar>
            {data.authorName
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">{data.authorName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {data.content}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
