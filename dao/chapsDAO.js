import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let chaps
export default class ChapsDAO {
    static async injectDB(conn) {
        if (chaps) {
            return
        }
        try {
            chaps = await conn.db("storysDatabase").collection("chapsCollection")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }




    static async addChap(storyId,chapId, title, urlImage, textChap) {
        try {
            const chapDoc = {
                storyId:storyId,
                chapId: chapId,
                title: title,
                urlImage: urlImage,
                textChap: textChap
            }
            console.log("adding")
            return await chaps.insertOne(chapDoc)
        } catch (e) {
            console.error(`Unable to post chap: ${e}`)
            return { error: e }
        }
    }




    static async getChap(chapId) {
        try {
            return await chaps.findOne({ chapId: parseInt(chapId) })
        } catch (e) {
            console.error(`Unable to get chap: ${e}`)
            return { error: e }
        }
    }




    static async updateChap(storyId,chapId, title, urlImage,textChap) {
        try {
            const updateResponse = await chaps.updateOne(
                {storyId:storyId, chapId: chapId },
                { $set: { title: title, urlImage: urlImage,textChap:textChap } }
            )




            return updateResponse
        } catch (e) {
            console.error(`Unable to update chap: ${e}`)
            return { error: e }
        }
    }




    static async deleteChap(storyId,chapId) {




        try {
            const deleteResponse = await chaps.deleteOne({
                storyId: storyId,chapId:chapId
            })




            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete chap: ${e}`)
            return { error: e }
        }
    }
    static async deleteAllChapsByStoryId(storyId) {
        try {
            const deleteResponse = await chaps.deleteMany({
                storyId: storyId
            })




            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete chap: ${e}`)
            return { error: e }
        }
    }



    static async getChapsByChapId(storyIdAndchapId) {
        try {
            let arr=storyIdAndchapId.split("_")
           
            let storyId=arr[0]
            let chapId=arr[1]
            const cursor = await chaps.find({storyId:parseInt(storyId), chapId: parseInt(chapId) })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get chap: ${e}`)
            return { error: e }
        }
    }
    static async getChapsByStoryId(storyId) {
        try {
            const cursor = await chaps.find({ storyId: parseInt(storyId) })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get chap by storyId: ${e}`)
            return { error: e }
        }
    }



}





