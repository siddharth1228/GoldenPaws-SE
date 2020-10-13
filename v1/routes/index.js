var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
var middleware=require("../middleware/index.js");
router.get("/",function(req,res){
    res.render("landing");
});






//=====================
//AUTHENTICATION ROUTES
//=====================

//register form

router.get("/register",function(req,res){
  res.render("register");
})

router.post("/register",function(req,res){
  var newUser=new User({username:req.body.username,fullName:req.body.fullName,email:req.body.email,phone:req.body.phone});
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      req.flash("error",err.message);
      return res.render("register")
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome to GoldenPaws")
      res.redirect("/dogs");
    });
  });
});
//end of registration


//login form

router.get("/login",function(req,res){

  res.render("login")
});


router.post("/login",passport.authenticate("local",
  {
    successRedirect:"/dogs",
    failureRedirect:"/login"
  }),function(req,res){
});
//login form ends

//logout
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged Out Successfully!")
  res.redirect("/");
});


router.get("/about",function(req,res){
  res.render("about")
});



//EDIT User ROUTE
router.get("/user/:id/edit_user",middleware.isLoggedIn,function(req,res){
  User.findById(req.params.id,function(err,foundUser){
      res.render("user_edit",{user:foundUser});
    
  });
 
});

//UPDATE User ROUTE
router.put("/user/:id",function(req,res){
  User.findByIdAndUpdate(req.params.id,{username:req.body.username,fullName:req.body.fullName,email:req.body.email,phone:req.body.phone},function(err,updatedUser){
    if(err){
      res.redirect("/");
    }
    else{
      req.flash("success","updated");
      res.redirect("/dogs");
    }
  })
})


module.exports=router;
