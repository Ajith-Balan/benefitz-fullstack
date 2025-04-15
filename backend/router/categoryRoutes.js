import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { CreateCategoryController , updateCategoryController, categoryControlller, singleCategoryController, deleteCategoryCOntroller } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn,  CreateCategoryController)


router.put(
    "/update-category/:id",
    requireSignIn,
    updateCategoryController
  );



  router.get("/get-category", categoryControlller);


  router.get("/single-category/:id", singleCategoryController);




  router.delete(
    "/delete-category/:id",
    requireSignIn,
    deleteCategoryCOntroller
  );



export default router;

