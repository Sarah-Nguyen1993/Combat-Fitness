module.exports = function(sequelize, DataTypes){
    const Recipe = sequelize.define("Recipe", {
        title: DataTypes.STRING, 
        serving: DataTypes.STRING, 
        prep_time: DataTypes.STRING, 
        sourceUrl: DataTypes.STRING
    });

    Recipe.associate = function(models){
        Recipe.belongsTo(models.User,{
            foreignKey: {
                allowNull:false
            }
        });
    };
    return Recipe;
}