const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;


//schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("nexentis", schemaData);


mongoose.connect("mongodb+srv://nexentisU:DmK5UiBrDHQ8rUuq@nexentis-cluster.0z4xmv6.mongodb.net/nexentisDB?retryWrites=true&w=majority").then(() => {
    console.log("Database connected successfully")
}).catch((err) => console.log('no connection'));



// Read All
app.get('/', async (req, res) => {
    const userData = await userModel.find({})
    res.send(userData);
})



// Read Single
app.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userModel.findById({_id: id});
    res.send(data);
})



// Insert
app.post("/create", async (req, res) => {
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "Data save successfully", data: data })
})



// Update
app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const data = await userModel.findByIdAndUpdate({ _id: id }, newData)
    res.send({ success: true, message: "Data updated successfully", data: data })
})



// Delete
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "Data deleted successfully", data: data })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})