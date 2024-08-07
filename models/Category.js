const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const Product = require('./Product.js');

class Category extends Model {}

Category.init(

{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    references: {
      model: "product",
      key: "id"   
      
    }
  },
  category_name: {
    type:DataTypes.STRING,

}},  // {
    // define columns
//     product_id: {
//       type:DataTypes.INTEGER,
//       references {
//         model: "product",
//         key:"id"
//       }
//    },


  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
