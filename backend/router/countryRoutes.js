import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js"
import { createCountryController, deletecountry, getcountrycontroller, getonecountry, searchCountryController, updatecountry,    } from "../controllers/countryController.js"

const router = express.Router()



router.post('/createCountry',   createCountryController)


router.get('/getCountry', getcountrycontroller)



router.get('/getoneCountry/:id', getonecountry)

router.post('/updateCountry/:id', updatecountry)


router.delete('/deleteCountry/:id', deletecountry)

// router.get('/product-category/:id', productCategoryController)


router.get('/search/:keyword', searchCountryController)




export default router
