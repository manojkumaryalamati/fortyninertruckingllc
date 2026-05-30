const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const distPath = path.resolve(__dirname, "dist/public");
console.log(distPath);
