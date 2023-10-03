import express from "express"
import cors from "cors"
import storys from "./api/storys.route.js"
import chaps from "./api/chaps.route.js"

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/storys",storys);
app.use("/api/v1/chaps",chaps);

app.use("*",(req,res)=>{
  res.status(404).json({error:"file not found"})
})
export default app;