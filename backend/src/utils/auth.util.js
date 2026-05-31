import jwt from 'jsonwebtoken'

export const generateAccessToken= (user)=>{
    return jwt.sign(
        {_id: user._id, username: user.username},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: "15m"},
    );
};

export const generateRefreshToken= (user)=>{
    return jwt.sign(
        {_id: user._id, username: user.username},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: "7d"},
    );
}

export const sendCookie =(res, accessToken, refreshToken)=>{
    res.cookie("token", accessToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000*60*15
    });
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000*60*60*24*7
    });
}