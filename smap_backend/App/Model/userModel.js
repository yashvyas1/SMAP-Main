import { sequelize } from "../../Config/dbConnection.js";
import { DataTypes } from "sequelize";

export const UserRegistrationSmap = sequelize.define(
    "UserRegistrationSmap", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: true,
            unique: true,
        },
        mobile_no: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        facebook: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        youtube: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        instagram: {
            type: DataTypes.TEXT,
            defaultValue: null
        },    
        linkedin: {
            type: DataTypes.TEXT,
            defaultValue: null
        },    
        twitter: {
            type: DataTypes.TEXT,
            defaultValue: null
        },    
        loginType: {
            type: DataTypes.ENUM('facebook', 'google', 'twitter', 'instagram', 'linkedin', '1XL'),
            defaultValue: '1XL'
        },
        last_modified_by_datetime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "smap_user_registration",
        timestamps: false,
        hooks: {
            beforeUpdate: (user, options) => {
                user.last_modified_by_datetime = new Date();
            },
        },
    }
);