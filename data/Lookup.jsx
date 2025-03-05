import dedent from "dedent";

export default {
  SUGGSTIONS: ["Crear App de Tareas en React", "Crear App de Gastos", "Crear Panel de Gestión Gym", "Crear Quiz de Historia", "Crear Pantalla de Inicio de Sesión"],
  HERO_HEADING: "¿Qué quieres construir?",
  HERO_DESC: "Ejecuta, personaliza y lanza aplicaciones web full-stack en segundos. 🚀",
  INPUT_PLACEHOLDER: "¿Qué quieres construir?",
  SIGNIN_HEADING: "Continuar con nerd.lat",
  SIGNIN_SUBHEADING: "Para usar Nerd, inicia sesión o crea una cuenta.",
  SIGNIn_AGREEMENT_TEXT: "Al usar Nerd, aceptas la recopilación de datos para análisis.",

  PRICING_TEXT: "Precios",
  NEED_MORE_TOKENS_TEXT: "Necesitas más tokens?",
  UPGRADE_YOUR_PLAN_TEXT: "Mejora tu plan",
  YOU_HAVE_TEXT: "Te quedan",
  TOKENS_TEXT: "Tokens",
 
  NEW_CHAT_TEXT: "Nuevo Chat",
  NOT_ENOUGH_TOKENS_TEXT: "No tienes suficientes tokens!",
  GENERATING_RESPONSE_TEXT: "Generando respuesta...",
  GENERATING_FILES_TEXT: "Generando archivos...",

  GET_STARTED_TEXT: "Empezar",
  LOGIN_TEXT: "Iniciar Sesión",
  SIGN_IN_WITH_GOOGLE_TEXT: "Iniciar Sesión con Google",

  EXPORT_TEXT: "Exportar",
  DEPLOY_TEXT: "Lanzamiento",

  CODE_TEXT: "Código",
  PREVIEW_TEXT: "Vista Previa",

  YOUR_CHATS_TEXT: "Tus Chats",

  CANCELED_PAYMENT_TEXT: "Pago Cancelado",
  CANCELED_PAYMENT_DESCRIPTION: "Algo salió mal con tu pago. No se te ha cobrado. Por favor, inténtalo de nuevo.",
  GO_TO_HOME_TEXT: "Volver a Inicio",

  SUCCESS_PAYMENT_TEXT: "Pago Exitoso",
  SUCCESS_PAYMENT_DESCRIPTION: "¡Felicidades por tu compra! Por favor, vuelve a inicio para seguir creando con Nerd.",

  UNAUTHORIZED_TEXT: "No autorizado",

  FAILED_TO_INITIATE_STRIPE_CHECKOUT: 'No se pudo abrir stripe',

  NERDLAT_TEXT: "Nerd.Lat",
  SW_MADE_EASY_TEXT: 'Software hecho fácil',

  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`
    },
  },
  DEPENDANCY: {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
    "framer-motion": "^10.16.1",
    "react-date-picker": "^9.1.2"
  },

  PRICING_DESC: "Empieza gratis para agilizar proyectos públicos o mejora tu equipo con entornos de producción al instante.",
  PRICING_OPTIONS: [
    {
      name: "Básico",
      tokens: "50K",
      value: 50000,
      desc: "Ideal para entusiastas y usuarios ocasionales con uso ligero.",
      price: 100
    },
    {
      name: "Inicial",
      tokens: "120K",
      value: 120000,
      desc: "Para profesionales que usan Nerd unas veces por semana.",
      price: 200
    },
    {
      name: "Pro",
      tokens: "2.5M",
      value: 2500000,
      desc: "Para profesionales que usan Nerd varias veces por semana.",
      price: 400
    },
    {
      name: "Ilimitado",
      tokens: "Ilimitado",
      value: 999999999,
      desc: "Para profesionales que requieren uso sin límites de Nerd.",
      price: 1000
    }
  ]


}