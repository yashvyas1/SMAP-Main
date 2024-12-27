import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserRegistrationSmap } from "../Model/userModel.js";
import { createjwtToken } from "../Utils/jwtUtils.js";
import {splitName, dbModal} from '../Utils/commonUtils.js';
import moment from "moment";
import { validateToken } from "../Utils/accessTokenUtils.js";
import { FacebookData } from "../Model/FacebookData.js";

const userRegistration = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const mobile_no = req.body?.mobile_no
    const dob = req.body?.dob
    if ( !firstName || !lastName || !email || !password) {
        return res.status(400).send("All Fields are Required");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const defaults = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword,
            mobile_no: mobile_no ? mobile_no : null,
            dob: dob ? moment(dob, 'MM/DD/YYYY').format('YYYY-MM-DD') : null,
        };
        const [user, created] = await UserRegistrationSmap.findOrCreate({
            where: {email: email},
            defaults: defaults
        })
        if(created) 
            return res.status(201).json({ "message" : "User Created Successfully!"});
        else
            return res.status(400).json({ "message" : "User Already Exists!"});
    } catch(err) {
        console.error('error: ', err);
        return res.status(500).send("Internal Server Error")
    }
})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and Password are required");
    }
    try {
        const user = await UserRegistrationSmap.findOne({
            where: { email: email },
        });

        const facebook = await FacebookData.findOne({
            where : {user_id : user.user_id },
        }); 

        if (!user) {
            return res.status(400).send("Invalid Email or Password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid Email or Password");
        }
        const { jwtToken, jwtExpiryTimeInMilliseconds } = createjwtToken(user.user_id, user.email)
        res.status(200).send({
            message: "Login Successful",
            token: jwtToken,
            jwtExpiryTimeInMilliseconds,
            user,
            facebook,
        });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

const validateaccess_token = asyncHandler(async (req, res) => {
    const validation = await validateToken(req)
    if(validation === false) {
        return res.status(400).json({ error: 'Invalid Token/Provider'})
    }
    if (req.user) {
        const { first_name, last_name } = splitName(req.user.name);
        const email = req.user.email;
        const username = req.user.name;
        const user_picture = req.user.picture.data.url;        
        const dob =req.user.birthday? moment(req.user.birthday, 'MM/DD/YYYY').format('YYYY-MM-DD'): null;
        const provider = req.body.provider;
        const accessToken = req.body.access_token;
        const loginType = provider;
        const providerFields = {
            facebook: null,
            youtube: null,
            instagram: null,
            linkedin: null,
            twitter: null
        };
        if (providerFields.hasOwnProperty(provider)) {
            providerFields[provider] = accessToken;
        }
        try {
            const [user, created] = await UserRegistrationSmap.findOrCreate({
                where: { email },
                defaults: { 
                    first_name, 
                    last_name, 
                    email, 
                    dob, 
                    ...providerFields,
                    loginType 
                },
                attributes: { exclude: ['password'] }
            });
            if (!created) {
                await UserRegistrationSmap.update(
                    { loginType, ...providerFields },
                    { where: { email } }
                );
            }
            const Modal = dbModal[provider];

            const [facebook, facebookCreated] = await Modal.findOrCreate({
                where: {user_id: user.user_id},
                defaults: {
                    user_id: user.user_id,
                    username: username,
                    user_picture: user_picture,
                    page_id: req.body.page_id,
                    page_access_token: req.body.page_access_token,
                    category_list: req.page.category_list,
                    page_name: req.page.name,
                    page_picture: req.page.picture.data.url
                }
            })

            const jwtToken = createjwtToken(user.user_id, email);
            res.status(200).send({
                success: true,
                message: 'User Authenticated',
                user, 
                jwtToken
            });
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(401).send({
            success: false,
            message: 'Authentication Failed'
        });
    }  
});

export { userRegistration, userLogin, validateaccess_token };