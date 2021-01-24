const Blog = require('../models/blogs');

  
//add new blog
const createblog = (blogs) => Blog.create(blogs);

//get all blog 
const getAll = (query) => Blog.find(query);

//read one blog
const readById = (id) => Blog.findById(id).exec();

//edit your blog 
const editBlog  = (id , body ) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();


//delete blog
const deleteById = (id) => Blog.findByIdAndDelete(id).exec();

//search by title
const searchByTitle = ({title}) => Blog.find({title}).exec();

//search by tag 
const searchByTag = ({tag}) => Blog.find({tag}).exec();

//search by auther
const searchByAuther = ({auther}) => Blog.find({auther}).exec();

//home to display blog sorted
const home = () => Blog.find().sort([[' createdAt',-1]]).exec()


module.exports = {
    createblog,
    getAll,
    readById,
    editBlog,
    deleteById,
    searchByTitle,
    searchByTag,
    searchByAuther,
    home
}