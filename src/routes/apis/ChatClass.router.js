const { chatService } = require("../../repositories/service");
const CustomRouter = require("../Routes.js");

class chatClassRouter extends CustomRouter {
    init (){
        
        //seteo de rutas
        this.get("/", ["public"], async (req, res) =>{
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
        this.post("/", ["user"] , async (req, res) =>{
            try {
                const {email, cartId, full_name, id, role }= req.user
                const {message} = req.body
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