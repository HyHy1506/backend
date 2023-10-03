import ChapsDAO from "../dao/chapsDAO.js"




export default class ChapsController {
  static async apiPostChap(req, res, next) {
    try {
      const storyId = parseInt(req.body.storyId)

      const chapId = parseInt(req.body.chapId)

      const title = req.body.title
      const urlImage = req.body.urlImage
      const textChap = req.body.textChap
      console.log('chapid'+ chapId+ title+ urlImage+ textChap)
      const chapResponse = await ChapsDAO.addChap(
        storyId,
        chapId,
        title,
        urlImage,
        textChap
      )
      res.json({ status: "success" })
    } catch (e) {
       
      res.status(500).json({ error: e.message })
    }
  }




  // static async apiGetChap(req, res, next) {
  //   try {
  //     let id = req.params.id || {}
  //     let chap = await ChapsDAO.getChap(id)
  //     if (!chap) {
  //       res.status(404).json({ error: "Not found" })
  //       return
  //     }
  //     res.json(chap)
  //   } catch (e) {
  //     console.log(`api, ${e}`)
  //     res.status(500).json({ error: e })
  //   }
  // }




  static async apiUpdateChap(req, res, next) {
    try {
      

      const storyId=parseInt( req.body.storyId)
      const chapId = parseInt(req.body.chapId)
      const title = req.body.title
      const urlImage = req.body.urlImage
      const textChap = req.body.textChap
     console.log("thu: "+storyId+" "+chapId+" "+title+" "+urlImage+" "+textChap)
      const chapResponse = await ChapsDAO.updateChap(
        storyId,
        chapId,
        title,
        urlImage,
        textChap
      )
      var { error } = chapResponse
      if (error) {
        res.status(400).json({ error })
      }




      if (chapResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update chap co loi",
        )
      }




      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }




  static async apiDeleteChap(req, res, next) {
    try {
      let storyAndChap=req.params.id
      let pair=storyAndChap.split("_")
      let storyId=parseInt( pair[0])
      let chapId=parseInt(pair[1])


      
      const chapResponse = await ChapsDAO.deleteChap(storyId,chapId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


static async apiDeleteAllChapsByStoryId(req, res, next) {
  try {
    
    let storyId=parseInt( req.params.id)
    console.log(storyId)


    
    const chapResponse = await ChapsDAO.deleteAllChapsByStoryId(storyId)
    res.json({ status: "success" })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

  static async apiGetChap(req, res, next) {
    try {
      let id = req.params.id || {}
      let chaps = await ChapsDAO.getChapsByChapId(id)
      if (!chaps) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(chaps)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiGetChapsByStoryId(req, res, next) {
    try {
      let id = req.params.id || {}
      let chaps = await ChapsDAO.getChapsByStoryId(id)
      if (!chaps) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(chaps)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}





