import { NextFunction, Request, Response } from "express";

function validateBlog(req:Request, res:Response, next:NextFunction){
 const {title, synopsis, content, imageUrl} = req.body

 if(!title){
    res.status(400).json({message:"Title is required"})
    return;
 }
  if(!content){
    res.status(400).json({message:"Content is required"})
    return;
 }
  if(!synopsis){
    res.status(400).json({message:"Synopsis is required"})
    return;
 }
  if(!imageUrl){
    res.status(400).json({message:"ImageUrl is required"})
    return;
 }
 next()
}

export default validateBlog