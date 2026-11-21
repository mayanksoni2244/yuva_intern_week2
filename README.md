# VueAuth — Week 2 Authentication Module

A self-contained frontend demonstration of a user authentication flow built with Vue 3, Vite, Vue Router, and Pinia.

## Features

- User registration with name, email, password, and confirm-password validation.
- Login using a registered email and password.
- Logout and protected dashboard route.
- Guest-only login/register routes.
- Pinia store for authentication and session state.
- Session persistence across page refreshes using `localStorage`.
- Passwords are hashed in the browser with Web Crypto PBKDF2 before being saved. Plain-text passwords are not stored.
- Responsive interface with loading, success, and error feedback.

## Requirements

- Node.js 18 or later (Node.js 20 LTS recommended).
- npm.

## Run locally

1. Extract the ZIP file.
2. Open a terminal in the extracted `VueAuth_Week2` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
npm run preview
```

## How to test

1. Open the Register page and create an account.
2. Use a valid name, email, and password (minimum 8 characters, including uppercase, lowercase, and a number).
3. After successful registration, the app signs in the new user and opens the dashboard.
4. Refresh the browser. The demo session should remain active.
5. Click **Log out**. The app returns to the login page.
6. Log in again using the account you registered.
7. Try invalid form values or an incorrect password to see validation and error messages.

## Project structure

```text
src/
├── assets/
│   └── main.css
├── components/
│   ├── AuthLayout.vue
│   └── FormField.vue
├── router/
│   └── index.js
├── services/
│   └── authService.js
├── stores/
│   └── authStore.js
├── views/
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   └── DashboardView.vue
├── App.vue
└── main.js
```

## Design decisions

- **Vue 3 Composition API:** Uses `<script setup>` for concise component logic.
- **Pinia:** Keeps authentication state and actions in one store instead of passing session data through many components.
- **Vue Router:** Defines login, register, and protected dashboard routes. Navigation guards prevent guests from opening the dashboard and redirect signed-in users away from guest pages.
- **Service layer:** `authService.js` owns demo account persistence and credential verification, keeping storage details out of UI components.
- **Reusable components:** `AuthLayout.vue` and `FormField.vue` keep the authentication screens consistent and reduce duplicated markup.
- **Validation:** Forms validate required fields, email format, password strength, and matching passwords before calling the store.

## Security limitations — read before production use

This project is a **frontend-only learning demo**, not a production authentication system. Accounts and the demo session are stored in the browser's `localStorage`. PBKDF2 hashing prevents plain-text passwords from being stored, but local browser storage can be inspected or modified by the device owner or malicious same-origin JavaScript. There is no server-side identity verification, rate limiting, email verification, password reset, or secure server-managed session.

For production, use a backend authentication API over HTTPS. Prefer secure, `HttpOnly`, `Secure`, `SameSite` cookies for server-managed sessions, implement server-side password hashing (for example Argon2id or bcrypt), validate and authorize every protected API request on the server, and add rate limiting and account recovery. A Vue route guard is a user-experience feature, not a security boundary.

## Notes

- The app uses browser Web Crypto APIs. Run it through Vite on `localhost` or another secure context; opening `index.html` directly with `file://` is not supported.
- This demo is intentionally self-contained and does not require a backend or external API.
