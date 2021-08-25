const Product = require('../model/product')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../helper/errors')
const fs = require('fs')
exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtension = true 
    form.parse(req,(err,fields,files) =>{
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err,result) => {
            if (err) {
                return res.status(400).json({
                    error : errorHandler(err)
                })
            }
            res.json({result})
        })
    })
}