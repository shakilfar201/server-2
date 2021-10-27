const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; 
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

// user : genius;
// pass : vonk2RsJ76KMAKQ2;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3sna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      
      const database = client.db('genius');
      const serviceCollection = database.collection('service');
      
      //   GET API
      app.get('/services', async (req,res)=>{
          const cursor = serviceCollection.find({});
          const service = await cursor.toArray();
          res.send(service);
      });

    //   GET ID
    app.get('/services/:id', async (req,res)=>{
        const id = req.params.id;
        const service = {_id: ObjectId(id)};
        const result = await serviceCollection.findOne(service);
        res.send(result);
    })

      //  POST API 
      app.post('/services', async (req,res)=>{
        const service = req.body;
        console.log('hit the post', service);
        const result = await serviceCollection.insertOne(service);
        res.json(result);
      })
      
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Abr Practice Suru R Error diye chull chirmu')
});

app.listen(port, ()=>{
    console.log('Listening to the port', port)
});

