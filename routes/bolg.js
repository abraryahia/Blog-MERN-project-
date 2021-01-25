const express = require('express');
const route = express.Router();
const {     createblog,
   getAll , 
  readById  ,
    editBlog  , 
    deleteById , 
    searchByTitle ,
    searchByTag ,
     searchByAuther ,
      home ,
    } = require('../controllers/blog')

    const multer=require('multer');
    const path=require('path');
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null, 'static/');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

const auth = require('../middleware/auth')
//  var multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });
  
//   const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  

//get all blog 
route.get('/all', async (req, res, next) => {
    try {
      const blogs = await getAll();
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });
  
//Home 
route.get('/home', async (req, res, next) => {
  try {
      const blog = await home();
      res.json(blog);
  } catch (e) {
      next(e);

  }
})

//to read one blog 
route.get('/one/:_id',auth, async (req, res, next) => {
  const { params : {_id} } = req;
try {
  const blogs = await readById({_id});
  res.json(blogs);
} catch (e) {
  next(e);
}
});

//route.use(auth);
//search by title
  route.get('/title/:title',auth, async (req, res, next) => {
    const { params : {title} } = req;
  try {
    const blogs = await searchByTitle({title});
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

//search by auther
route.get('/auther/:auther',auth, async (req, res, next) => {
  const { params : {auther} } = req;
try {
  const blogs = await searchByAuther({auther});
  res.json(blogs);
} catch (e) {
  next(e);
}
});

//search by tag
route.get('/tag/:tag',auth, async (req, res, next) => {
  const { params : {tag} } = req;
try {
  const blogs = await searchByTag({tag});
  res.json(blogs);
} catch (e) {
  next(e);
}
});

//Add new blog
// route.post('/add',auth, async (req , res , next )=>{
//      const { body , user: { id }} = req ;
//     try{
//     const blog = await createblog({ ...body , auther : id });
//     res.json(blog);
//        } catch (e) {
//     next(e);
//   }
// }) 
//to add photo
route.post('/add',auth,async (req, res, next) => {
     const upload = multer({ storage: storage }).single("photo");
     upload(req,res, async function(err){
        const { body, user:{id} } = req;
        if(req.file!=undefined)
        body.photo= req.file.path;
        try{
        const blog =  createblog({ ...body, auther: id })
         res.json(blog);
              } 
         catch (e) {
           next(e);
          }
    });
    
});
//get your post 
route.get('/profile', auth,async (req, res, next) => {
  const { user: { id } } = req;
  try {
      const blog = await getAll( { auther: id });
      res.json(blog);

  } catch (e) {
      next(e);

  }
});

//edit one blog 
route.patch('/:_id',auth, async (req, res, next) => {
  const { params : {_id} , body  } = req;
try {
  const blogs = await editBlog ({_id} , body );
  res.json(blogs);
} catch (e) {
  next(e);

}
});

//Delete one blog 
route.delete('/:_id',auth, async (req, res, next) => {
  const { params : {_id} , user: { id } } = req;
try {
  const blogs = await deleteById({_id});
  res.send('Delete Done')
} catch (e) {
  next(e);
}
});

module.exports = route;
