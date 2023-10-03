import express from "express"
import ChapsCtrl from "./chaps.controller.js"
const router=express.Router();
// get all chap by a story id
router.route("/chap/story/:id")
.get(ChapsCtrl.apiGetChapsByStoryId)
router.route("/chap/deleteOfStory/:id").delete(ChapsCtrl.apiDeleteAllChapsByStoryId)
// get a chap by a chap id
router.route("/chap/:id").get(ChapsCtrl.apiGetChap)
router.route("/chap/new").post(ChapsCtrl.apiPostChap)
router.route("/chap/edit/:id")
  .get(ChapsCtrl.apiGetChap)
  .put(ChapsCtrl.apiUpdateChap)
  .delete(ChapsCtrl.apiDeleteChap)
export default router
// router.route("/").get((req,res)=>{
//   res.send("hello word")
// })





