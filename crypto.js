import bcrypt from "bcrypt";

const hashPassword = async (plainTextPass) => {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPass, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

const hashPasswordSync = (plainTextPass) => {
    return bcrypt.hashSync(plainTextPass, 10);
};

const comparePassword = async (plainPassword, hashPassword) => {
    try {
        const result = await bcrypt.compare(plainPassword, hashPassword);
        return result;
    } catch (error) {
        throw error;
    }
};


export { hashPassword, hashPasswordSync, comparePassword };