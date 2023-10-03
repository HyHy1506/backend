import app from "./server.js"
  import mongodb from "mongodb"
import StorysDAO from"./dao/storysDAO.js"
import ChapsDAO from "./dao/chapsDAO.js";
const MongoClient=mongodb.MongoClient;
const mongo_username="truyen"
const mongo_password="01Dcal06"
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@truyen1.afrfdry.mongodb.net/?retryWrites=true&w=majority`
const port=8000
MongoClient.connect(
  uri,
  {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
  }
).catch(err=>{
  console.log(err.stack)
  process.exit(1)  
}).then(async client=>{
  await StorysDAO.injectDB(client)
  await ChapsDAO.injectDB(client)
  app.listen(port,()=>{
    console.log(`listening ${port}`)
  })
})