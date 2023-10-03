import StorysDAO from "../dao/storysDAO.js"


export default class StorysController {
  static async apiPostStory(req, res, next) {
    try {
      const storyId = parseInt(req.body.storyId)
      const title = req.body.title
      const urlImage = req.body.urlImage
      const description = req.body.description
     
      const storyResponse = await StorysDAO.addStory(
        storyId,
        title,
        urlImage,
        description
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async apiGetStory(req, res, next) {
    try {
      let id = req.params.id || {}
      let story = await StorysDAO.getStory(id)
      if (!story) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(story)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }


  static async apiUpdateStory(req, res, next) {
    try {
      const storyId =parseInt( req.params.id)
      const title = req.body.title
      const urlImage = req.body.urlImage
      const description = req.body.description

      const storyResponse = await StorysDAO.updateStory(
        storyId,
        title,
        urlImage,
        description
      
      )


      var { error } = storyResponse
      if (error) {
        res.status(400).json({ error })
      }


      if (storyResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update story",
        )
      }


      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async apiDeleteStory(req, res, next) {
    try {
      const storyId = req.params.id
      const storyResponse = await StorysDAO.deleteStory(storyId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async apiGetStorys(req, res, next) {
    try {
      let id = req.params.id || {}
      let storys = await StorysDAO.getStorysByStoryId(id)
      if (!storys) {
        res.status(404).json({ error: "Not found" }) 
        return
      }
      res.json(storys)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiGetAllStorys(req, res, next) {
    try { 
      
      let storys = await StorysDAO.getAllStorys()
      if (!storys) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(storys)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}

