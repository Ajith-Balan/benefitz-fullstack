import workModel from "../models/works.model.js";
import categoryModel from '../models/category.model.js'
export async function createWorkController(req, res) {
  try {
    const { name, photo, category, details,  } = req.body;

    // Validation (add additional checks if necessary)
    if (!name  || !category || !details) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Create the product
    const work = await workModel.create({
      name,
      photo,
      category,
      details,
    });

    // Send success response with the created product
    res.status(201).send({
      success: true,
      message: "Work Created Successfully",
      work, // send the created product back
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Work",
    });
  }
}




export async function getworkcontroller(req,res){
  try{

      const data=await workModel.find();
      res.status(200).send(data)
  }catch (error){
      res.status(500).send(error)
  }
}





export async function getonework(req,res) {
  try {
      const {id}=req.params;
      const data = await workModel.findOne({_id:id})
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}





export async function updatework(req,res){
  try{
      const {id}=req.params;
      const{...data}=req.body
      await workModel.updateOne({_id:id},{$set:{...data}})
      res.status(201).send({msg:"updated"})
      
  }catch (error){
      res.status(400).send(error)
}
}



export async function deletework(req,res){
  try{
      const {id}=req.params;
      await workModel.deleteOne({_id:id});
      res.status(200).send({msg:"sucessfully deleted"})
  }catch (error){
      console.error(error);
      res.status(400).send({error})
  }
}

export const workCategoryController = async (req, res) => {
  try {
    const { id } = req.params; 
    const category = await categoryModel.findOne({ _id: id }); // Fetch category by id
    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    // Fetch products by category _id (use category._id)
    const works = await workModel.find({ category: category._id });

    res.status(200).send({
      success: true,
      category,
      works,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: 'Error while getting products',
    });
  }
};






export const searchProductController = async(req,res)=>{
  try {
    const {keyword}= req.params
    const results= await productModel.find({
      $or:[
        {name:{$regex : keyword,$options :"i"}},
        {description:{$regex : keyword,$options:"i"}}
      ]
    })
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message:"error in search product"
    })
    
  }
}