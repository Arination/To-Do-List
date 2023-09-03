const express = require("express");
const to_do_list = express();
const parser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { constants } = require("http2");

//------------------FOR DATE---------------
const suffixMap = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
};

//--------------------EJS INIT------------------------
to_do_list.set('view engine', 'ejs');

to_do_list.use(parser.urlencoded({extended: true}));
to_do_list.use(express.static("public"));

//------------------DB-------------------------

mongoose.connect("mongodb+srv://admin-arinagrawal39:Test123@cluster0.jp8jpba.mongodb.net/todoDB", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect(MONGODB_URI || "mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });


const itemsSchema= {
    name: String
}
const workitemsSchema= {
    namel: String
}

const Item = mongoose.model(
    "Item", itemsSchema
)

const Itemwork = mongoose.model(
    "Itemwork", workitemsSchema
)

const item1 = new Item({
    name: "Welcome to your todolist!",
});


const defaultItems = [item1];

to_do_list.get("/", function(req, res){
    //---------DATE LOGIC----------
    const date = new Date();
    const dateDay = date.getDate();
    const dateMonth = date.toLocaleString('default', { month: 'long' });
    const dateYear = date.getFullYear();
    const pluralRule = new Intl.PluralRules('en-GB', { type: 'ordinal' });
    const dateOrdinal = suffixMap[pluralRule.select(dateDay)];
  
    const ordinalDateString = `${dateDay}${dateOrdinal} ${dateMonth}, ${dateYear}`;

    Item.find({})
    .then(function (foundItems) {
      if (foundItems.length === 0) {
        /** Insert Items 1,2 & 3 to todolistDB */
        Item.insertMany(defaultItems)
          .then(function (result) {
            console.log("Sucessfully Added Default Items to DB.");
          })
          .catch(function (err) {
            console.log(err);
          });
          res.redirect("/");
      } else res.render("todays", { currentDate: ordinalDateString, list: foundItems });
    })
    .catch(function (err) {
      console.log(err);
    });
});

to_do_list.post('/', function(req, res){
    const name = req.body.newItem;

    const item = new Item({
        name: name
    });
    item.save();
    res.redirect("/");
});

to_do_list.post('/delete', function(req, res){
    const checkedItemID = req.body.checkbox;
    
    Item.findByIdAndRemove(checkedItemID)
    .then(()=>{
        console.log("delete success");
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});


// -----------------WORK TO DO POST---------------
to_do_list.get("/work", function(req, res){
    Itemwork.find({})
    .then(function (foundItems) {
      if (foundItems.length === 0) {
        /** Insert Items 1,2 & 3 to todolistDB */
        Itemwork.insertMany(defaultItems)
          .then(function (result) {
            console.log("Sucessfully Added Default Items to DB.");
          })
          .catch(function (err) {
            console.log(err);
          });
          res.redirect("/work");
      } else res.render("work", {listl: foundItems });
    })
    .catch(function (err) {
      console.log(err);
    });
});

to_do_list.post('/work', function(req, res){
    const namel = req.body.newIteml;

    const iteml = new Itemwork({
        namel: namel
    });
    iteml.save();
    res.redirect("/work");
});

to_do_list.post('/deletework', function(req, res){
    const checkedItemworkID = req.body.checkboxw;
    
    Itemwork.findByIdAndRemove(checkedItemworkID)
    .then(()=>{
        console.log("delete success");
        res.redirect("/work");
    })
    .catch((err)=>{
        console.log(err);
    });
});



//------------------SERVER-----------------------
to_do_list.listen(5990, function(){
    console.log("Server Created at 5990 Jai MATA di")
})