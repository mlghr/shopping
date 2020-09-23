const express = require("express")
const router = new express.Router()
const ExpressError = require("./expressError")
const items = require("./fakeDb")

items.push(`{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}`)

router.get("/", function(req,res){
  res.json({items})
})

router.post("/", function (req, res) {
  const newItem = { name: req.body.name }
  items.push(newItem)
  res.status(201).json({ item: newItem })
})

router.get("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if(foundItem === undefined){
    throw new ExpressError("Item not found", 404)
  }
  res.json({ item: foundItem })
})

module.exports = router;