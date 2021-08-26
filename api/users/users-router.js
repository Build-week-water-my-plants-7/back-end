const router = require('express').Router();
const Users = require("./users-model");
const { restricted } = require("../middleware/auth-middleware");
const reqBody = require('../middleware/routeMiddleware')


//get all users
router.get("/",  async (req, res, next) => {
    try {
      const users = await Users.find()
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      next({ apiCode: 500, apiError: "error getting users", ...err })
    }
  }) 

//get user by id
 router.get("/:id", restricted, async (req, res, next) => {
   const id = req.params.id
   if (!id) {
     next({ apiCode: 404, apiError: 'user not found' })
   } try {
     const user = await Users.findById(id)
     res.json(user)
   } catch (err) {
     next({ apiCode: 500, apiError: 'error getting user', ...err })
   }
 })

 //add user plant
 router.post('/:id', reqBody, restricted, async (req, res, next) => {
  const id = req.params.id
  if (!id) {
      next({ apiCode: 404, apiError: 'user not found' })
  }
  try {
      const addedPlant = await Users.addPlants(
          req.params.id,
          req.body.plant_id
      )
      const user = await Users.findById(id)
      res.status(201).json(user)
  } catch (err) {
      next({
          apiCode: 500,
          apiError: 'error adding plant',
          ...err
      })
  }
})
 
//update user
router.put('/:id', reqBody, restricted, async (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!id) {
      next({ apiCode: 400, apiError: 'need id', ...err })
  } try {
      const user = await Users.updateProfile(id, req.body)
      res.json(user)
  } catch (err) {
      next({ apiCode: 500, apiError: 'error updating user', ...err })
  }
})

  //delete plant
  router.delete('/:id/plant', reqBody, restricted, async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (!id) {
        next({ apiCode: 404, apiError: 'user not found' })
    } try {
        const deletedPlant = await Users.removePlants(
            req.params.id,
            req.body.plant_id
        )
        res.json({ message: `Plant with id ${req.body.plant_id} has been deleted from user ${req.params.id}` })
    } catch (err) {
        next({ apiCode: 500, apiError: 'error deleting user', ...err })
    }
})

  //delete user
  router.delete('/:id', restricted, async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (!id) {
        next({ apiCode: 404, apiError: 'user not found' })
    } try {
        const user = await Users.remove(id, {})
        res.json({ message: `User with id ${req.params.id} has been deleted` })
    } catch (err) {
        next({ apiCode: 500, apiError: 'error deleting user', ...err })
    }
})

module.exports = router;