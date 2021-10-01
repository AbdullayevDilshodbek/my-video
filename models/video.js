'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // define association here
    }
  };
  Video.init({
    title: DataTypes.STRING,
    decription: DataTypes.STRING,
    video_path: DataTypes.STRING,
    image_path: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'videos',
    modelName: 'Video',
  });
  return Video;
};