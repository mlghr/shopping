const express = require("express")
const router = new express.Router()
const ExpressError = require("./expressError")
const items = require("./fakeDb")

items.push({"cereal": "1.00"}, {"milk": "3.25"})

router.get("/", function(req, res){
  console.log("hello")
  console.log(req.body)
  res.json({items})
})

router.post("/", function (req, res) {
  console.log(`Look here I am body ${req.body}`)
  console.log(`I am headers ${req.headers}`)
  const newItem = req.body 
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

router.patch("/:name", function (req, res) {
  let name = req.params.name
  console.log(`Here is the name ${name}`)
  let foundItem = items.find((name, price) => {
    if(name === req.params.name) {
      items.name.price = price
    }
  });
  return res.json({ message: "Edited" })
})


module.exports = router;