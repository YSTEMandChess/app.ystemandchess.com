const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const config = require('config')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  //User.findById(id, function (err, user) {
  done(err, user)
  //})
})

passport.use(
  new JwtStrategy(
    {
      secretOrKey: config.get('jwtSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.user.id)
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  )
)
