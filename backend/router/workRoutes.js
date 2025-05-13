import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js"
import { createWorkController, deletework, getonework, getworkcontroller, updatework, workCategoryController } from "../controllers/workController.js"

const router = express.Router()



router.post('/create-work', requireSignIn, isAdmin, createWorkController)


router.get('/get-work', getworkcontroller)


router.get('/getone-work/:id', getonework)

router.put('/update-work/:id', updatework)


router.delete('/delete-work/:id', deletework)

router.get('/work-category/:id', workCategoryController)


// router.get('/search/:keyword', searchProductController)




export default router