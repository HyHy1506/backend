import express from "express"
import StorysCtrl from "./storys.controller.js"
const router=express.Router();

router.route("/story").get(StorysCtrl.apiGetAllStorys)
router.route("/story/:id").get(StorysCtrl.apiGetStorys)
router.route("/new").post(StorysCtrl.apiPostStory)
router.route("/:id")
  .get(StorysCtrl.apiGetStory)
  .put(StorysCtrl.apiUpdateStory)
  .delete(StorysCtrl.apiDeleteStory)
export default router
// router.route("/").get((req,res)=>{
//   res.send("hello word")
// })

 