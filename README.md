# Liquify js

<img src="ressources/images/fish.gif" align="right">

**Web-GL filter for rasterize and liquify HTML elements**

[![Build Status](https://travis-ci.org/seeren/liquify-js.svg?branch=master)](https://travis-ci.org/seeren/liquify-js)
[![Coverage Status](https://coveralls.io/repos/github/seeren/liquify-js/badge.svg?branch=master)](https://coveralls.io/github/seeren/liquify-js?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/89e8998a632244a9b14061503b12bd03)](https://www.codacy.com/app/seeren/liquify-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=seeren/liquify-js&amp;utm_campaign=Badge_Grade)
[![Downloads](https://img.shields.io/npm/dt/liquify-js.svg)](https://www.npmjs.com/package/liquify-js)
[![Release](https://img.shields.io/npm/v/liquify-js.svg)](https://www.npmjs.com/package/liquify-js)


## Demo

Try Liquify filter by visiting the [GitHub Pages](https://seeren.github.io/liquify-js/).

## 📦 Install

Install with [npm](https://www.npmjs.com/package/liquify-js).
```
npm install liquify-js
```
Include JavaScript file.
```html
<script type="text/javascript" src="node_modules/liquify-js/dist/liquify.js"></script>
```

## 💧 Usage

Add **liquify** attribute to an HTMLElement.

![Demo](ressources/images/jelly.gif)

```html
<div liquify>Liquified</div>
```
Options **frequency**, **degree** and **amplitude** can be configured using attributes.
```html
<div liquify
     liquify.frequency="0.5"
     liquify.degree="55"
     liquify.amplitude="0.5">Liquified</div>
```
Options can be configured dynamically using the Liquify property of the HTMLElement.
```js
const element = window.document.querySelector("[liquify]");
element.Liquify.frequency = 0.5;
element.Liquify.degree = 55;
element.Liquify.amplitude = 0.5;
```

## 🎓 License
This project is licensed under the [MIT](LICENSE) License.