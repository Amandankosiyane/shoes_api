const ObjectId =  require("mongodb").ObjectId;
module.exports = function(models) {

        const AllShoes = function(req, res, next) {
                models.storeShoes.find({}, function(err, foundShoes) {
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundShoes
                        })
                })
        }

        const showBrands = function(req,res,next){
                var brandname = req.params.brandname
                models.storeShoes.find({
                        Brand: brandname
                }, function(err, foundBrand){
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundBrand
                        })
                })
        }

        const showSizes = function(req,res,next){
                var size = req.params.size
                models.storeShoes.find({
                        Size: size
                }, function(err, foundSize){
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundSize
                        })
                })
        }

const showColors = function(req,res,next){
        var color = req.params.color

        models.storeShoes.find({
                Color: color
        }, function(err, foundColor){
                if (err) {
                        return next(err)
                }
                res.json({
                        foundColor
                })
        })
}


        const showBrandSizeAndColor = function(req,res,next){
                var brandname = req.params.brandname;
                var size = req.params.size;
                var color = req.params.color;


                models.storeShoes.find({
                        Brand: brandname,
                        Size: size,
                        Color: color
                }, function(err, foundShoesAndSize){
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundShoesAndSize
                        })
                })
        }

const updatingStock = function(req,res,next){
        var shoeId = req.params.id;
        models.storeShoes.findOneAndUpdate({
                _id: ObjectId(shoeId)
        },
        {
                $inc:{
                        "InStock": -1
                },
        },
        {
                        upsert: false
                }, function(err, soldShoes){
                        if (err) {
                                return res.json({
                                        status: "error",
                                        error: err,
                                        newShoes: []
                                });
                                }
                                else{
                                        res.json({
                                                status: "success",
                                                newShoes: soldShoes
                                        })
                        }
                })
// var shoeId = req.params.id;
// models.storeShoes.findOneAndUpdate({
//         _id: ObjectId(shoeId)
// }, function(err,soldShoe) {
//         if (err) {
//                 return next(err)
//         }
//         soldShoe.InStock = soldShoe.InStock - 1;
//         soldShoe.save(function(err, updatedShoes){
//                 if (err) {
//                         return next(err)
//                 }
//                 req.flash('error', 'We have ' + soldShoe.InStock + ' available')
//         })
// })
}

        const addNewShoes = function(req, res, next) {
        var newShoes = req.body
                models.storeShoes.create({
                        Brand: newShoes.Brand,
                        Color: newShoes.Color,
                        Price: newShoes.Price,
                        Size: newShoes.Size,
                        InStock: newShoes.InStock
                }, function(err, newShoesData){
                        if (err) {
                                return next(err)
                        }
                        res.send(newShoesData)
                })
        }

        return {
                AllShoes,
                showBrands,
                showSizes,
                showColors,
                showBrandSizeAndColor,
                updatingStock,
                addNewShoes
        }
}
