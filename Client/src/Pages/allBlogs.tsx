import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Blog from "../components/Blogs"
import Loader from "../components/Loader";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/blogs");
      console.log(response.data);
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

  return (
    <Box component="section" mt={2}>
      <Grid container justifyContent="center" spacing={3} mt={2.5} px={4}>
        {data &&
          data.map((blog: Blog) => (
            blog.isDeleted === false && <Blog
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
          ))}
      </Grid>
    </Box>
  );
}

export default AllBlogs;
