const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../Members')


router.get('/', (req, res) => res.json(members))

//get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))

    } else {
        res.status(400).json({ msg: `No member of id ${req.params.id}` })
    }
})

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'inculde name and email' })
    }

    members.push(newMember)
    //res.json(members)
    res.redirect('/')
})



//Update Menber
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const uptMenber = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = uptMenber.name ? uptMenber.name : member.name;
                member.email = uptMenber.email ? uptMenber.email : member.email;

                res.json({msg:'Member has been update',member})
            }
        })

    } else {
        res.status(400).json({ msg: `No member of id ${req.params.id}` })
    }
})




//Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({msg:'member has been deleted',members:members.filter(member => member.id !== parseInt(req.params.id))})

    } else {
        res.status(400).json({ msg: `No member of id ${req.params.id}` })
    }
})
module.exports = router