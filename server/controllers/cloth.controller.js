const Cloth = require('../models/cloth.model')

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Cloth content can not be empty',
    })
  }

  const cloth = new Cloth({
    title: req.body.title || 'No product title',
  })

  cloth
    .save()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        mesage: err.message || 'Something wrong while creating the cloth',
      })
    })
}

exports.findAll = (req, res) => {
  Cloth.find()
    .then(cloth => {
      console.log(cloth)
      res.send(cloth)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving products.',
      })
    })
}

// // Retrieve all products from the database.
// exports.findAll = (req, res) => {
//     Product.find()
//     .then(products => {
//         res.send(products);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving products."
//         });
//     });
// };
//
// // Find a single product with a productId
// exports.findOne = (req, res) => {
//     Product.findById(req.params.productId)
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send(product);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Something wrong retrieving product with id " + req.params.productId
//         });
//     });
// };
//
// // Update a product
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body) {
//         return res.status(400).send({
//             message: "Product content can not be empty"
//         });
//     }
//
//     // Find and update product with the request body
//     Product.findByIdAndUpdate(req.params.productId, {
//         title: req.body.title || "No product title",
//         description: req.body.description,
//         price: req.body.price,
//         company: req.body.company
//     }, {new: true})
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send(product);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Something wrong updating note with id " + req.params.productId
//         });
//     });
// };
//
// // Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Product.findByIdAndRemove(req.params.productId)
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send({message: "Product deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete product with id " + req.params.productId
//         });
//     });
// };
