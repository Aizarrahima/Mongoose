// jshint es version: 6'

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// create schema
// fruits
const fruitSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        // validation
        required: [true, "name should added"]
    },
    rating: {
        type: Number,
        // validation
        min: 1,
        max: 10
    },
    review: String
});
// person
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema // establish document; embedding a fruit document inside this property called favouriteFruit in our person document
})

// create mongoose model
// fruit
const Fruit = mongoose.model("Fruit", fruitSchema); // "Fruit" => name of collections
// person
const Person = mongoose.model("Person", personSchema);

// create documents
// fruit
// const fruit = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit."
// });
const fruit = new Fruit({
    rating: 10,
    review: "Peaches are so yummy!"
});
const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit"
});
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});
const mango = new Fruit({
    name: "Mango",
    score: 6,
    review: "Decent fruit"
})
// const orange = new Fruit({
//     name: "Orange",
//     rating: 4,
//     review: "To sour for me"
// });
// const banana = new Fruit({
//     name: "Banana",
//     rating: 3,
//     review: "Weird texture"
// });
// person
// const person = new Person({
//     name: "John",
//     age: 37,
// });
// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });

// save document
// fruit
// fruit.save(); // save documents into Fruit collections and into fruitsDB database
// pineapple.save();
mango.save();
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Succesfully saved all the fruits to fruitsDB")
//     }
// })
// person
// person.save();

// reading document
Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err)
    } else {
        // console.log(fruits)

        mongoose.connection.close();

        fruits.forEach(function (fruit) { // fruits => array that we got back from our database, forEach => looping
            console.log(fruit.name)
        })
    }
})

// Update data
// Fruit.updateOne({ _id: "62dce24df6cba29f777f5ed8" }, { name: "Peach" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document");
//     }
// });

// Challenge
// Person.updateOne({ _id: "62dd37bca0d47a719c2a38bf" }, { favouriteFruit: kiwi }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document");
//     }
// });

// Update data (adding news data)
Person.updateOne({ name: "John" }, { favouriteFruit: mango }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document");
    }
})

// Delete one data
// Person.deleteOne({ _id: "62dd37bca0d47a719c2a38bf" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted this document");
//     }
// });

// Delete many data
// Person.deleteMany({ name: "John" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all data");
//     }
// });
