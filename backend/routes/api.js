const express = require('express')
const router = express.Router()
const Subscriber = require('../../models/subscriberSchema')

// Getting all users
router.get('/users', async (req, res) => {
    try {
        const subs = await Subscriber.find()
        res.json(subs)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.get('/users/:id', getSubscriber,(req, res) => {
   res.json(res.subscriber)
})

// Create new User
router.post('/users', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSub = await subscriber.save()
        res.status(201).json(newSub)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})


// Edit a User
router.patch('/users/:id', getSubscriber, async (req, res) => {
   if(req.body.name != null){
        res.subscriber.name = req.body.name
   }
   if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
   }

   try {
    const updatedSub = await res.subscriber.save()
    res.json(updatedSub)
   } catch (error) {
    res.status(400).json({ message: error.message })
   }
})

router.delete('/users/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: 'Deleted User'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getSubscriber(req, res, next) {
    let sub
    try {
        sub = await Subscriber.findById(req.params.id)
        if(sub === null){
            return res.status(404).json({ message: 'User cannot be found.'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.subscriber = sub
    next()
}

module.exports = router