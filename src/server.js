require('dotenv').config();
const express = require('express');
const rotas = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(PORT, () => {
    console.log(`Servidor ON. Rodando em http://localhost:${PORT}`);
});

