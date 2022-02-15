const router = require('express').Router();
const Message = require('../models/Message');

//add a message


router.post('/',async(req,res)=>{
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating message" });
    }
})

//get all messages of a conversation

router.get('/:conversationId',async(req,res)=>{
    try{
        const messages = await Message.find({conversationId:req.params.conversationId});
        res.status(200).json(messages);
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error getting message" });
    }
})


module.exports = router;