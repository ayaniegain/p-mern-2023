const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required " });
    }
    if (name=="") {
      return res.status(401).send({ message: "name is null " });
    }
    const existingCategory = await categoryModel.findOne({ name });

    //existing user
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Already Category exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    // if(category.name==""){
    //   res.status(500).send({
    //     success: false,
    //     error,
    //     message: "category name null",
    //   });
    // }

    // console.log(category.name)
    res.status(200).send({
      success: true,
      message: "Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in Category",
    });
  }
};
//update category

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "updated Category successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in Update Category",
    });
  }
};

//getAll category

const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "getAll category successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in allgetall Category",
    });
  }
};


//single category

const singleCategoryController = async (req, res) => {
  const {slug}=req.params

  try {
    const category = await categoryModel.findOne({slug});
    res.status(200).send({
      success: true,
      message: "single category successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single Category",
    });
  }
};


//delete category

const deleteCategoryController = async (req, res) => {
  const {id}=req.params
  try {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      res.status(200).send({
        success: true,
        message: "delete category not exists  ",
        category,
      });
      
    }else{

      res.status(200).send({
        success: true,
        message: "delete category successfully ",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in delete Category",
    });
  }
};



module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  singleCategoryController,
  deleteCategoryController
};
