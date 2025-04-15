import countryModel from "../models/country.model.js";
import categoryModel from '../models/category.model.js'
export async function createCountryController(req, res) {
  try {
    const { name, photo,description,details  } = req.body;

    // Validation (add additional checks if necessary)
    if (!name || !description ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Create the country
    const country = await countryModel.create({
      name,
      photo,
      description,
      details

    });

    // Send success response with the created product
    res.status(201).send({
      success: true,
      message: "country Created Successfully",
      country, // send the created product back
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating country",
    });
  }
}




export async function getcountrycontroller(req,res){
  try{

      const data=await countryModel.find();
      res.status(200).send(data)
  }catch (error){
      res.status(500).send(error)
  }
}





export async function getonecountry(req,res) {
  try {
      const {id}=req.params;
      const data = await countryModel.findOne({_id:id})
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}





export async function updatecountry(req,res){
  try{
      const {id}=req.params;
      const{...data}=req.body
      await countryModel.updateOne({_id:id},{$set:{...data}})
      res.status(201).send({msg:"updated"})
      
  }catch (error){
      res.status(400).send(error)
}
}



export async function deletecountry(req,res){
  try{
      const {id}=req.params;
      await countryModel.deleteOne({_id:id});
      res.status(200).send({msg:"sucessfully deleted"})
  }catch (error){
      console.error(error);
      res.status(400).send({error})
  }
}



// export const productCategoryController = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const category = await categoryModel.findOne({ _id: id }); // Fetch category by id
//     if (!category) {
//       return res.status(404).send({
//         success: false,
//         message: 'Category not found',
//       });
//     }

//     // Fetch products by category _id (use category._id)
//     const products = await productModel.find({ category: category._id });

//     res.status(200).send({
//       success: true,
//       category,
//       products,
//     });
    
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       error,
//       message: 'Error while getting products',
//     });
//   }
// };






export const searchCountryController = async(req,res)=>{
  try {
    const {keyword}= req.params
    const results= await countryModel.find({
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