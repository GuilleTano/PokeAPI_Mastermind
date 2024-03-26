import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const myPassport = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "secretKey"
    };
    passport.use(new JwtStrategy(opts, async (decoded, done) => {
        try {
            // Los datos de user corresponden a los datos codificados en el token
            const user = { id: decoded.sub, username: decoded.name };
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
};

export default myPassport;
