import { FacebookData } from "./FacebookData.js";
import { UserRegistrationSmap } from "./userModel.js";

export const syncModel = async () => {
    await UserRegistrationSmap.sync({ alter: true })
    await FacebookData.sync({ alter: true})
};