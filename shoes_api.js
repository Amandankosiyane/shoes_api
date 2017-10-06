const ObjectId = require("mongodb").ObjectId;
module.exports = function(models) {

        const shoes = function(req, res, next) {
                res.send({
                        shoes
                })
        }

        const AllShoes = function(req, res, next) {
                models.storeShoes.find({}, function(err, foundShoes) {
                        if (err) {
                                return next(err)
                        }
                        res.json(
                                foundShoes)
                })
        }

        const showBrands = function(req, res, next) {
                var brandname = req.params.brandname
                models.storeShoes.find({
                        Brand: brandname
                }, function(err, foundBrand) {
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundBrand
                        })
                })
        }

        const allBrands = function(req, res, next) {
                models.storeShoes.find({}, function(err, allBrands) {
                        var brands = [];
                        var BrandMap = {};

                        for (var i = 0; i < allBrands.length; i++) {
                                var newBrand = allBrands[i];
                                if (BrandMap[newBrand.Brand] === undefined) {
                                        BrandMap[newBrand.Brand] = newBrand.Brand;
                                        brands.push(newBrand.Brand);
                                }
                        }
                        if (err) {
                                return next(err)
                        }

                        res.json({
                                brands: brands.sort("a-z")
                        })

                })
        }


        const showSizes = function(req, res, next) {
                var size = req.params.size
                models.storeShoes.find({
                        Size: size
                }, function(err, foundSize) {
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundSize
                        })
                })
        }

        const allSizes = function(req, res, next) {
                models.storeShoes.find({}, function(err, allSizes) {
                        var sizes = [];
                        var sizeMap = {};

                        for (var i = 0; i < allSizes.length; i++) {
                                var newSize = allSizes[i];
                                if (sizeMap[newSize.Size] === undefined) {
                                        sizeMap[newSize.Size] = newSize.Size;
                                        sizes.push(newSize.Size);
                                }
                        }
                        if (err) {
                                return next(err)
                        }

                        res.json({
                                sizes: sizes.sort(function(a, b) {
                                        return (a - b)
                                })
                        })

                })
        }

        const showColors = function(req, res, next) {
                var color = req.params.color

                models.storeShoes.find({
                        Color: color
                }, function(err, foundColor) {
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundColor
                        })
                })
        }

        const allColors = function(req, res, next) {
                models.storeShoes.find({}, function(err, allColors) {
                        var colors = [];
                        var colorMap = {};

                        for (var i = 0; i < allColors.length; i++) {
                                var newColor = allColors[i];
                                if (colorMap[newColor.Color] === undefined) {
                                        colorMap[newColor.Color] = newColor.Brand;
                                        colors.push(newColor.Color);
                                }
                        }
                        if (err) {
                                return next(err)
                        }

                        res.json({
                                colors: colors.sort("a-z")
                        })

                })
        }

        const showBrandSize = function(req, res, next) {
                var brandname = req.params.brandname;
                var size = req.params.size;

                models.storeShoes.find({
                        Brand: brandname,
                        Size: size,
                }, function(err, foundShoesAndSize) {
                        if (err) {
                                return next(err)
                        }
                        res.json({
                                foundShoesAndSize
                        })
                })
        }

        const updatingStock = function(req, res, next) {
                var shoeId = req.params.id;
                models.storeShoes.findOneAndUpdate({
                        _id: ObjectId(shoeId)
                }, {
                        $inc: {
                                "InStock": -1
                        },
                }, {
                        upsert: false
                }, function(err, soldShoes) {
                        console.log(soldShoes.InStock);
                        if (err) {
                                return res.json({
                                        status: "error",
                                        error: err,
                                        newShoes: []
                                });
                        }

                        if (soldShoes.InStock <= 0) {
                                soldShoes.remove()
                                res.json({
                                        status: "success",
                                        newShoes: soldShoes
                                })
                        }
                })
        }

        const addNewShoes = function(req, res, next) {
                var newShoes = req.body
                models.storeShoes.findOneAndUpdate({
                        Brand: newShoes.Brand,
                        Color: newShoes.Color,
                        Price: newShoes.Price,
                        Size: newShoes.Size
                }, {
                        $inc: {
                                InStock: newShoes.InStock
                        }
                }, function(err, newShoesData) {
                        if (err) {
                                return next(err)
                        } else if (!newShoesData) {

                                models.storeShoes.create({
                                        Brand: newShoes.Brand,
                                        Color: newShoes.Color,
                                        Price: newShoes.Price,
                                        Size: newShoes.Size,
                                        InStock: newShoes.InStock
                                }, function(err, newShoesData) {
                                        console.log(newShoes.Brand);
                                        if (err) {
                                                return next(err)
                                        }
                                });
                        }
                        res.json({
                                newShoesData: newShoesData
                        })
                })
        }

        return {
                shoes,
                AllShoes,
                showBrands,
                allBrands,
                showSizes,
                allSizes,
                showColors,
                allColors,
                showBrandSize,
                updatingStock,
                addNewShoes
        }
}
