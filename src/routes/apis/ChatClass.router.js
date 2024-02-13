const { chatService } = require("../../repositories/service");
const CustomRouter = require("../Routes.js");

class chatClassRouter extends CustomRouter {
    init (){
        
        //seteo de rutas
        this.get("/", async (req, res) =>{
            try {
                const response = await chatService.getMessages()
                return response.status == "error" ?
                res.sendUserError(response.payload)
            :
                res.sendSuccess(response.payload)
        
        } catch (error) {
            return res.sendServerError(response.payload)
        } 
        })
        this.post("/", async (req, res) =>{
            try {
                const {message, email} = req.body
                const response = await chatService.sendMessage (message, email)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)
            
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })
    }
}
module.exports = chatClassRouter