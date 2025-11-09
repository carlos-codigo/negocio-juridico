// 🔥 COLE SUA CONFIG DO FIREBASE AQUI
// Vá em Firebase → Configurações → SDK Web → Copiar objeto config

const firebaseConfig = {
  apiKey: "AIzaSyDJ5eQuqaMZ_MFGmVop1y4nJ0A5YFjtfP4",
  authDomain: "negocio-juridico.firebaseapp.com",
  databaseURL: "https://negocio-juridico-default-rtdb.firebaseio.com",
  projectId: "negocio-juridico",
  storageBucket: "negocio-juridico.firebasestorage.app",
  messagingSenderId: "436064549013",
  appId: "1:436064549013:web:8b7b99d0a9f293ec1ac39c",
  measurementId: "G-7MMNZVE49H"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
