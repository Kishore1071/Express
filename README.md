# Express Notes API (ES Modules)

Structure:
```
src/
  controllers/
    authController.js
    notesController.js
  middleware/
    auth.js
  models/
    User.js
    Note.js
    RefreshToken.js
  routes/
    auth.js
    notes.js
  app.js
.env.example
package.json
```

Features:
- ES module (`"type": "module"`) project
- JWT access + refresh tokens with refresh token storage (revocable)
- Mongoose models, organized controllers
- `POST /api/user/register`
- `POST /api/token` -> { access, refresh }
- `POST /api/token/refresh` -> { access }
- `POST /api/token/revoke`
- `GET /notes`, `POST /notes`, `DELETE /notes/:id` (authenticated)

Quick start:
1. Copy `.env.example` to `.env` and set values.
2. Run `npm install`
3. Run `npm run dev` (requires nodemon) or `npm start`

Notes:
- Access tokens expire in minutes (set in .env).
- Refresh tokens expire in days (set in .env) and are stored in DB so you can revoke them.



ACCESS_SECRET=5374a72b8ac34591746250233a8ea32078146db7d19729a7b77a4057f22c8ea84bc2acf17138beb8d108727f1bc470454bb92f6440c43e120bba372753a03c04
REFRESH_SECRET=aecb2f5dd436627b8038783a1d3031ca87173f214ff83d8301aec3bd7501db00d0bc1265acdb3eeb80b0989244d8bf43d5f1bff09406f85b44185db5b71ec679
ACCESS_EXP=3
REFRESH_EXP=30
