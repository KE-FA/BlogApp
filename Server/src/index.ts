import express, {Express} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import verifyUser from '../middlewares/verifyuser';



// import authRoutes from './routes/auth';
// import blogRoutes from './routes/blogs';
// import userRoutes from './routes/user';


const app:Express = express();
const client = new PrismaClient();
app.use(express.json());



app.get ("/", (_req, res) => {
    res.send("Welcome to the blog App")
})

app.post("/auth/register", verifyUser, async (req, res) =>{
   try{
    const {firstName, lastName, userName, emailAddress, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await client.users.create({
        data: { firstName, lastName, userName, emailAddress, password:hashedPassword}
    })
    res.status(201).json({message: "user created successfully"})
    // console.log(firstName,userName)
    // res.send("Register a new user")

   } catch (e){
    res.status(500).json({message: "Something went wrong"})
   }
})

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
