import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Blog from "../components/blog";
import Loader from "../components/loader";
import useUser from "../store/userStore";

interface Blog {
  blogId: string;
  title: string;
  synopsis: string;
  content: string;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

function AllBlogs() {
  const { user } = useUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/blogs");
      return response.data;
    },
  });

  if (isError) {
    return (
      <Stack component="section" p={4}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Something Went Wrong
        </Typography>
      </Stack>
    );
  }

  if (isLoading) {
    return <Loader message="Loading Please wait ..." />;
  }

  const filteredBlogs = data?.filter(
    (blog: Blog) => blog.users.id === user?.id && !blog.isDeleted
  );

  return (
    <Box component="section" mt={2}>
      <Grid container justifyContent="center" spacing={3} mt={2.5} px={4}>
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog: Blog) => (
            <Blog
              key={blog.blogId}
              blogId={blog.blogId}
              title={blog.title}
              synopsis={blog.synopsis}
              content={blog.content}
              imageUrl={blog.imageUrl}
              isDeleted={blog.isDeleted}
              authorName={`${blog.users.firstName} ${blog.users.lastName}`}
              authorId={blog.users.id}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <Typography variant="body1">You don’t have any blogs yet.</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default AllBlogs;
