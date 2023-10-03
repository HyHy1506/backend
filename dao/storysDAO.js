import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId


let storys


export default class StorysDAO {
  static async injectDB(conn) {
    if (storys) {
      return
    }
    try {
      storys = await conn.db("storysDatabase").collection("storysCollection")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }


  static async addStory(storyId, title, urlImage, description) {
    try {
      const storyDoc = {
        storyId: storyId,
        title: title,
        urlImage: urlImage,
        description: description
      }
      console.log("adding")
      return await storys.insertOne(storyDoc)
    } catch (e) {
      console.error(`Unable to post story: ${e}`)
      return { error: e }
    }
  }


  static async getStory(storyId) {
    try {
      return await storys.findOne({ storyId: parseInt(storyId) })
    } catch (e) {
      console.error(`Unable to get story: ${e}`)
      return { error: e }
    }
  }


  static async updateStory(storyId,title,urlImage,description) {
    try {
      const updateResponse = await storys.updateOne(
        { storyId:storyId },
        { $set: { title: title, urlImage: urlImage,description:description } }
      )


      return updateResponse
    } catch (e) {
      console.error(`Unable to update story: ${e}`)
      return { error: e }
    }
  }


  static async deleteStory(storyId) {


    try {
      const deleteResponse = await storys.deleteOne({
        storyId: parseInt(storyId),
      })


      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete story: ${e}`)
      return { error: e }
    }
  }


  static async getStorysByStoryId(storyId) {
    try {
      const cursor = await storys.find({ storyId: parseInt(storyId) })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get story: ${e}`)
      return { error: e }
    }
  }
  static async getAllStorys() {
    try {
      const cursor = await storys.find({})
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get all story: ${e}`)
      return { error: e }
    }
  }

}

