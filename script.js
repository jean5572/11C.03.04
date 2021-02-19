"use strict";
window.addEventListener("DOMContentLoaded", init);

function init() {
  document.addEventListener("input", selectedColor);
  selectedColor();
}

function selectedColor() {
  let hexColor = document.querySelector("#js-colorpicker").value;
  console.log("This is your selected color:");
  console.log(hexColor);

  const rgbObject = hexToRgb(hexColor);
  const hslObject = rgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);
  readHarmony(hslObject);
}

function readHarmony(hslObject) {
  const harmony = document.querySelector("#harmony-selection").value;
  console.log("Harmony is: " + harmony);
  if (harmony == "analogous") {
    calculateAnalogous(hslObject);
  } else if (harmony == "monochromatic") {
    calculateMonochromatic(hslObject);
  } else if (harmony == "triad") {
    calculateTriad(hslObject);
  } else if (harmony == "complementary") {
    calculateComplementary(hslObject);
  } else if (harmony == "compound") {
    calculateCompound(hslObject);
  } else if (harmony == "shades") {
    calculateShades(hslObject);
  }
}

//HARMONIES
function calculateAnalogous(hslObject) {
  let ten = 10;
  let newH = hslObject.h + ten;
  let newS = hslObject.s;
  let newL = hslObject.l;

  const analocolor_a = { h: newH, s: newS, l: newL };
  newH = newH + ten;

  const analocolor_b = { h: newH, s: newS, l: newL };
  newH = newH + ten;

  const analocolor_d = { h: newH, s: newS, l: newL };
  newH = newH + ten;

  const analocolor_e = { h: newH, s: newS, l: newL };

  hslHarmonyToRgb(analocolor_a, "a");
  hslHarmonyToRgb(analocolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(analocolor_d, "d");
  hslHarmonyToRgb(analocolor_e, "e");
}

function calculateMonochromatic(hslObject) {
  let ten = 10;
  let newH = hslObject.h;
  let newLessS = hslObject.s - ten;
  let newMoreS = hslObject.s + ten;
  let newLessL = hslObject.l - ten;
  let newMoreL = hslObject.l + ten;
  let newL = hslObject.l;
  let newS = hslObject.s;
  //less S
  const monocolor_a = { h: newH, s: newLessS, l: newL };
  //
  //more S
  const monocolor_b = { h: newH, s: newMoreS, l: newL };
  //less L
  const monocolor_d = { h: newH, s: newS, l: newLessL };
  //more L
  const monocolor_e = { h: newH, s: newS, l: newMoreL };

  hslHarmonyToRgb(monocolor_a, "a");
  hslHarmonyToRgb(monocolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(monocolor_d, "d");
  hslHarmonyToRgb(monocolor_e, "e");
}

function calculateTriad(hslObject) {
  let shifted60 = hslObject.h + 60;
  let shifted120 = hslObject.h + 120;
  let moreL = hslObject.l + 10;
  let lessL = hslObject.l - 10;
  let newL = hslObject.l;
  let newS = hslObject.s;

  //shifted 60
  const tricolor_a = { h: shifted60, s: newS, l: newL };
  //shifted 120
  const tricolor_b = { h: shifted120, s: newS, l: newL };
  //shifted 60 more L
  const tricolor_d = { h: shifted60, s: newS, l: moreL };
  //shfted 120 less L
  const tricolor_e = { h: shifted120, s: newS, l: lessL };

  hslHarmonyToRgb(tricolor_a, "a");
  hslHarmonyToRgb(tricolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(tricolor_d, "d");
  hslHarmonyToRgb(tricolor_e, "e");
}

function calculateComplementary(hslObject) {
  let shifted180 = hslObject.h + 180;
  let shifted120 = hslObject.h + 120;
  let moreL = hslObject.l + 10;
  let lessL = hslObject.l - 10;
  let newL = hslObject.l;
  let newS = hslObject.s;

  //shifted 180
  const complcolor_a = { h: shifted180, s: newS, l: newL };

  const complcolor_b = { h: shifted120, s: newS, l: newL };

  const complcolor_d = { h: shifted180, s: newS, l: moreL };
  //console.log(newH);
  //
  //shfted 120 less L
  const complcolor_e = { h: shifted120, s: newS, l: lessL };
  //console.log(newH);
  //
  hslHarmonyToRgb(complcolor_a, "a");
  hslHarmonyToRgb(complcolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(complcolor_d, "d");
  hslHarmonyToRgb(complcolor_e, "e");
}

function calculateCompound(hslObject) {
  let ten = 10;
  let newH = hslObject.h + ten;
  let newS = hslObject.s;
  let newL = hslObject.l;
  let shifted180 = hslObject.h + 180;
  let moreL = hslObject.l + 10;
  //10 added to h
  const compcolor_a = { h: newH, s: newS, l: newL };
  //10 more added to new h
  newH = newH + ten;
  const compcolor_b = { h: newH, s: newS, l: newL };
  //shifted 180
  const compcolor_d = { h: shifted180, s: newS, l: newL };
  //shifted 180 more L
  const compcolor_e = { h: shifted180, s: newS, l: moreL };

  hslHarmonyToRgb(compcolor_a, "a");
  hslHarmonyToRgb(compcolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(compcolor_d, "d");
  hslHarmonyToRgb(compcolor_e, "e");
}

function calculateShades(hslObject) {
  let twenty = 20;
  let newH = hslObject.h;
  let newS = hslObject.s;
  let newL = hslObject.l + twenty;

  const shadcolor_a = { h: newH, s: newS, l: newL };

  newL = newL + twenty;
  const shadcolor_b = { h: newH, s: newS, l: newL };

  newL = newL + twenty;
  const shadcolor_d = { h: newH, s: newS, l: newL };

  newL = newL + twenty;
  const shadcolor_e = { h: newH, s: newS, l: newL };

  hslHarmonyToRgb(shadcolor_a, "a");
  hslHarmonyToRgb(shadcolor_b, "b");
  hslHarmonyToRgb(hslObject, "c");
  hslHarmonyToRgb(shadcolor_d, "d");
  hslHarmonyToRgb(shadcolor_e, "e");
}

//CALCULATE
function hslHarmonyToRgb(colors, index) {
  let h = colors.h;
  let s = colors.s / 100;
  let l = colors.l / 100;

  console.log(colors.h);

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const rgb = { r, g, b };
  console.log(r);
  showSelectedColor(rgb, index);
}

function showSelectedColor(rgb, index) {
  const cssString = rgbToCss(rgb);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  colorTheBox(hex, index);
  showHex(hex, index);
  showRgb(cssString, index);
  showHsl(hsl, index);
}

function hexToRgb(hexColor) {
  //split hex into tree parts and convert to numbers
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  //here retuneres et object
  return { r, g, b };
}

function rgbToCss(rgb) {
  return `( ${rgb.r}, ${rgb.g}, ${rgb.b} )`;
}

function rgbToHex(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length < 2) {
    r = "0" + r;
  }
  if (g.length < 2) {
    g = "0" + g;
  }
  if (b.length < 2) {
    b = "0" + b;
  }

  return `#${r}${g}${b}`;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return { h, s, l };
}

function colorTheBox(hexColor, index) {
  document.querySelector(`#color_${index} .colorbox`).style.backgroundColor = hexColor;
}

//SHOW ELEMENTS
function colorTheBox(hexColor, index) {
  document.querySelector(`#color_${index} .colorbox`).style.backgroundColor = hexColor;
}

function showHex(hexColor, index) {
  document.querySelector(`#color_${index} .hex .js-color-hex`).innerHTML = hexColor;
}

function showRgb(cssString, index) {
  document.querySelector(`#color_${index} .rgb .js-color-rgb`).innerHTML = cssString;
}

function showHsl(hsl, index) {
  document.querySelector(`#color_${index} .hsl .js-color-hsl`).innerHTML = `${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, ${hsl.l.toFixed(0)}%`;
}
