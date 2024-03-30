import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const myPassport = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "secretKey"
    };
    passport.use(new JwtStrategy(opts, async (decoded, done) => {
        try {
            //console.log("Contenido de decoded en auth.js:")
            //console.log(decoded)
            const user = { userId: decoded.userId, userName: decoded.userName };
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
};

export default myPassport;