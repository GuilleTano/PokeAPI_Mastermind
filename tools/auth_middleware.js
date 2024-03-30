import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const authMiddleware = {}

authMiddleware.myPassport = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "secretKey"
    };
    passport.use(new JwtStrategy(opts, async (decoded, done) => {
        try {
            const user = { userId: decoded.userId, userName: decoded.userName };
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
};

authMiddleware.protectWithJwt = (req, res, next) => {
    // Con este if definimos que estos dos endpoint no esten protegidos, para que el usuario pueda loguear, por ejemplo
    if (req.path == "/" || req.path == "/auth/login") {
        return next();
    }
    return passport.authenticate("jwt", { session: false})(req, res, next);
}

export { authMiddleware }