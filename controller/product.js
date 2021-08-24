const Product = require('../model/product')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../helper/errors')

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtension = true 
    form.parse(req,(err,fields,files) =>{
        if(err) {
            return res.status(400).json({
                error : "Image upload failed"
            })
        }
        let product = new Product(fields)
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType =files.photo.type
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