import express, {Express} from 'express';
import cors from 'cors';



import authRouter from './routes/auth.route';
// import blogRoutes from './routes/blogs';
// import userRoutes from './routes/user';


const app:Express = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173/",
    // methods:["POST", "GET", "PUT", "PATCH", "DELETE"]
}));



app.get ("/", (_req, res) => {
    res.send("Welcome to the blog App")
})

//Routes
app.use("/auth", authRouter)

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
