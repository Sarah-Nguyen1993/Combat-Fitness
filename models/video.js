module.exports = function(sequelize, DataTypes){
    const Video = sequelize.define("Video", {
        videoUrl: DataTypes.STRING
    });

    Video.associate = function(models){
        Video.belongsTo(models.User,{
            foreignKey: {
                allowNull:false
            }
        });
    };
    return Video;
}