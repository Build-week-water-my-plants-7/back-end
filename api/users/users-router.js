const router = require('express').Router();
const Users = require("./users-model");
const { restricted } = require("../middleware/auth-middleware");

router.get("/",  (req, res, next) => {
    Users.find().then(users => {
        res.status(200).json(users)
    })
    .catch(next)
   }) 
 router.get("/:id", (req, res, next) => {
   Users.findById(req.params.id)
     .then(user => {
       res.status(200).json(user);
     })
     .catch(next);
 })

 router.post('/', restricted, (req,res,next)=>{
    Users.addUser(req.body)
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(next)
})
 
router.put("/:id", async (req, res) => {
    try {
      const changes = req.body;
      const { id } = req.params;
      const data = await Users.updateProfile(id, changes);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json("error on phone number update", err.message);
    }
  });

  router.delete('/:id', restricted, (req, res, next)=>{
    Users.remove(req.params.id)
    .then(user =>{
      if(user >0){
        res.status(200).json({message: "The user has been deleted."})
      } else {
        res.status(404).jkson({message: "The user could not be found."})
      }
    })
    .catch(next)
    
  })

module.exports = router;