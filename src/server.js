const app = require(".");
const { connectDb } = require("./config/db");


const PORT = 5040;
app.get('/', (req,res)=>{
    res.status(200).send({message: 'Welcome to E-commerce API', status: true})
})

app.listen(PORT, async()=>{
    await connectDb();
    console.log(`E-commerce is listening on PORT ${PORT}`);
})