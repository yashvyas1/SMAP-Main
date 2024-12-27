import { sequelize } from "../../Config/dbConnection.js";
import { DataTypes } from "sequelize";
import { UserRegistrationSmap } from "./userModel.js";
export const FacebookData = sequelize.define(
    "FacebookData",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserRegistrationSmap, 
                key: "user_id",
            },
            allowNull: false,
            onDelete: 'CASCADE' 
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        user_picture: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        page_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        page_name: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        page_picture: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        page_access_token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category_list: {
            type: DataTypes.JSON, 
            allowNull: true, 
            defaultValue: [], 
        },
        total_followers: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total_posts: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total_likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total_comments: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total_shares: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        growth_followers: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        growth_posts: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        growth_likes: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        growth_comments: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        growth_shares: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        last_modified_by_datetime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "facebook_data",
        timestamps: false,
        hooks: {
            beforeUpdate: (facebookData, options) => {
                facebookData.last_modified_by_datetime = new Date();
            },
        },
    }
);
UserRegistrationSmap.hasOne(FacebookData, {
    foreignKey: "user_id",
    onDelete: "CASCADE", 
});
FacebookData.belongsTo(UserRegistrationSmap, {
    foreignKey: "user_id",
});