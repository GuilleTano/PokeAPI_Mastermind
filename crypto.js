import bcrypt from "bcrypt";
const myCrypt = {};

myCrypt.hashPassword = async (plainTextPass) => {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPass, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

myCrypt.hashPasswordSync = (plainTextPass) => {
    return bcrypt.hashSync(plainTextPass, 10);
};

myCrypt.comparePassword = async (plainPassword, hashPassword) => {
    try {
        const result = await bcrypt.compare(plainPassword, hashPassword);
        return result;
    } catch (error) {
        throw error;
    }
};


export { myCrypt };