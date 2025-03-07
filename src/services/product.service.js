const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLavelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLavelCategory,
            level: 1
        });
        await topLevel.save();
    }

    let secondLevel = await Category.findOne({ name: reqData.secondLavelCategory, parentCategory: topLevel._id });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLavelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({ name: reqData.thirdLavelCategory, parentCategory: secondLevel._id });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLavelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPersent: reqData.discountPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        category: thirdLevel._id
    });

    return await product.save();
}


async function deleteProduct(productId) {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully..."
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData)
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error('Product not found with id: ' + id);
    }
    return product
}

async function getAllProduct(reqQuery) {
    let { 
        category, 
        color, 
        sizes, 
        minPrice, 
        maxPrice, 
        mindiscount, 
        sort, 
        stock, 
        pageNumber, 
        pageSize 
    } = reqQuery;
    pageSize=pageSize||12;

    let query = Product.find().populate("category");

    if(category) {
        const existsCategory = await Category.findOne({name:category});
        if(existsCategory) {
            query=query.where("category").equals(existsCategory._id);
        } else {
            return {content:[], currentPage:1, totalPages:0}
        }
    }

    if(color) {
        const colorSet = new Set(color.split(',').map(color=>color.trim().toLowerCase()));

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join('|'), "i"):null;

        query=query.where("color").regex(colorRegex);
    }

    if(sizes) {
        const sizesArray = sizes.split(',').map(size => size.trim());
        query = query.where("sizes.name").in([...sizesArray]);
    } else if (reqQuery.size) {
        query = query.where("sizes.name").equals(reqQuery.size);
    }
    
    
    if (minPrice > 0 && maxPrice > 0) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice)
    }
    
    if(mindiscount) {
        query = query.where('discountPersent').gt(mindiscount);
    }

    if(stock) {
        if(stock=="in_stock") {
            query=query.where("quantity").gt(0)
        } else if(stock=="out_of_stock") {
            query=query.where("quantity").gt(1)
        } 
    }

    if(sort) {
        const sortDirection=sort="price_high"?-1:1;
        query=query.sort({discountedPrice:sortDirection})
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber-1)*pageSize;

    query=query.skip(skip).limit(pageSize);

    const products = await query.exec();
    const totalPages=Math.ceil(totalProducts/pageSize);

    return { content: products, currentPage: pageNumber, totalPages}
}

/** This is for the Admin.... which is less in use, but it needs to be there for the starting use of Admin! */

async function createMultipleProduct(products) {
    for(let product of products) {
        await createProduct(product);
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProduct,
    createMultipleProduct
}