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
