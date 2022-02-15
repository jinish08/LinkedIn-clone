const router = require('express').Router();
const Conversation = require('../models/Conversation');

router.post("/",async(req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating conversation" });
    }
});

//get a conversation of a user
router.get("/:userId",async(req,res)=>{
    try{
        const conversations = await Conversation.find({members:{$in:[req.params.userId]}});
        res.status(200).json(conversations);
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error getting conversation" });
    }

});
module.exports = router;