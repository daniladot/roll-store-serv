var express = require('express');
var router = express.Router();
var ticketsArr = require('../reduceJson');
const {MongoClient} = require('mongodb');

let tickets = null


const mongoConnect = async () => {
    const uri = "mongodb+srv://vram:vram@cluster0.rwmjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect(async err => {
        console.log('trying')
        tickets = client.db("roll-store").collection("roll-menu");
        console.log('goood connection')
    });

}

const createEndpoints = async () => {
    /* GET home page. */
    router.get("/", async (req, res) => {
        const response = await tickets.find().toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))
        res.json(response);
    })

    router.get("/sasimi", async (req, res) => {
        const response = await tickets.find({categoryId: 1}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })

    router.get("/hot-rolls", async (req, res) => {
        const response = await tickets.find({categoryId: 2}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })

    router.get("/rolls", async (req, res) => {
        const response = await tickets.find({categoryId: 3}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })

    router.get("/salats", async (req, res) => {
        const response = await tickets.find({categoryId: 4}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })

    router.get("/sets", async (req, res) => {
        const response = await tickets.find({categoryId: 5}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })

    router.get("/soups", async (req, res) => {
        const response = await tickets.find({categoryId: 6}).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))

        res.json(response);
    })
}

//     router.get("/all", async (req, res) => {
//
//         const response = await tickets.find().limit(+req.query.limit).toArray()
//             .catch(err => console.error(`Failed to find documents: ${err}`))
//         res.json(response);
//     })
//
//     router.get("/filter", async (req, res) => {
//             let response = null
//
//             console.log(req.query)
//
//             // if (req.query.forwardAirline && req.query.sortDuration === 'true') {
//             response = await tickets
//                 .find(
//                     (req.query.minPrice || req.query.maxPrice || req.query.transfer)
//                         ? {$and: [{price: {$gte: +req.query.minPrice || 0}}, {price: {$lte: +req.query.maxPrice || 10000000}}, {"forwardTicket.transfer": req.query.transfer == 'true' ? {$eq: 0} : {$lte: 1}}]}
//                         : {}
//                 )
//                 .limit(req.query.limit ? +req.query.limit : 0)
//                 .sort(
//                     req.query.sortForwardDuration === 'true' && {"forwardTicket.totalDuration": 1}
//                     ||
//                     req.query.sortPrice === 'true' && {price: 1}
//                     ||
//                     req.query.sortPrice === 'false' && {price: -1}
//                     ||
//                     {}
//
//                 )
//                 .toArray()
//
//
//
//
//             if (req.query.company === 'true') {
//                 const arr = []
//                 response.forEach(elem => {
//                     arr.push(elem.forwardTicket.airline)
//                 })
//
//                 let arr_2 = arr.filter((item, index) => {
//                     return arr.indexOf(item) === index
//                 });
//                 res.json(arr_2);
//
//             } else{
//                 res.json(response);
//             }
//         }
//     )
// //
// }

const launch = async () => {
    await mongoConnect()


    // setTimeout(() => {
    //      ticketsArr.forEach((elem) => {
    //         console.log(elem.price)
    //          tickets.insertOne(elem)
    //          // tickets.update({price: elem}, {$set: {price: +elem}}, false, true);
    //      })
    // }, 2000)


    await createEndpoints()
}

launch()


module.exports = router;
