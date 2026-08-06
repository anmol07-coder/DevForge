const crypto = require("crypto");

const generateSecureToken = () =>{
    const rawToken = crypto
                    .randomBytes(32)
                    .toString("hex");

    const hashedToken = crypto
                        .createHash("sha256")
                        .update(rawToken)
                        .digest("hex");

    return {
        rawToken ,
        hashedToken
    };
};

const hashToken = (token) =>{
    return crypto
           .createHash("sha256")
           .update(token)
           .digest("hex");
}

module.exports = {
    generateSecureToken,
    hashToken
}