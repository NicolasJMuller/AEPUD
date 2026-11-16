# AEPUD

## Connexion en local

L’API utilise PHP 8.2+, OpenSSL, Composer, Symfony et LexikJWTAuthenticationBundle.

```sh
composer --working-dir=api install
npm install
npm run dev
```

`npm run dev` lance React et l’API Symfony. Ouvre l’URL indiquée par Vite. La page `/connexion` affiche les deux comptes de test.

| Compte | E-mail | Mot de passe |
| --- | --- | --- |
| User | `user@user.fr` | `user123` |
| Admin | `admin@admin.fr` | `admin123` |

Les empreintes sont dans `api/config/demo-users.json`. Les clés de développement sont générées au démarrage. Un redémarrage invalide les anciens jetons.

## Routes de l’API

| Méthode | Route | Accès |
| --- | --- | --- |
| POST | `/api/login_check` | Public. Attend un JSON avec `username` et `password`. Renvoie `{ "token": "…" }`. |
| GET | `/api/me` | Tout compte authentifié. Renvoie son nom et ses rôles. |
| GET | `/api/user` | `ROLE_USER` |
| GET | `/api/admin` | `ROLE_ADMIN` |

Le client conserve le JWT dans `sessionStorage` et le transmet dans l’en-tête `Authorization: Bearer <token>`. Le serveur répond `401` si l’identification est nécessaire et `403` si l’utilisateur connecté n’a pas le rôle requis. Le token expire au bout d’une heure.

Pour un hébergement, remplace les comptes de démonstration avant d’exposer le site. Fournis les clés JWT dans `api/config/jwt` et sers React et `/api` sous la même origine en HTTPS. Fais pointer les requêtes API vers `api/public/index.php` et transmets l’en-tête `Authorization` à PHP. Les autres URL React doivent être réécrites vers `index.html`.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
