const express = require('express');
const mysql = require('mysql2');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


