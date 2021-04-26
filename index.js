//npm run dev->para usar nodemon

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { kMaxLength } = require('buffer');
const { RSA_SSLV23_PADDING } = require('constants');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));



app.post('/calculadora/resultado', (req, res) => {
  const r1 = req.body.r1;
  const v1 = req.body.v1;

  const r2 = req.body.r2;
  const v2 = req.body.v2;

  const r3 = req.body.r3;
  const v3 = req.body.v3;

  var i = '';
  var i1 = req.body.i1;
  var i2 = req.body.i2;
  var i3 = req.body.i3;

  var rt;
  var va = 'VA';
  var VA;

  function validari1(i1) {
    if (i1 === '-') {
      i1 = (Number(IT(i)) + Number(v1)) / r1;
      i1 = i1 * 1000;
      return Number(i1.toFixed(1));
    }

    else if (i1 === '+') {
      i1 = (v1 - IT(i)) / r1;
      i1 = i1 * 1000;
      return Number(i1.toFixed(1));
    }
  }


  function validari2(i2) {
    if (i2 === '-') {
      i2 = (Number(IT(i)) + Number(v2)) / r2;
      i2 = i2 * 1000;
      return Number(i2.toFixed(1));
    }

    else if (i2 === '+') {
      i2 = (v2 - IT(i)) / r2;
      i2 = i2 * 1000;
      return Number(i2.toFixed(1));
    }
  }

  function validari3(i3) {
    if (i3 === '-') {
      i3 = (Number(IT(i)) + Number(v3)) / r3;
      i3 = i3 * 1000;
      return Number(i3.toFixed(1));
    }

    else if (i3 === '+') {
      i3 = (v3 - IT(i)) / r3;
      i3 = i3 * 1000;
      return Number(i3.toFixed(1));
    }
  }


  function formula(i1) {
    if (i1 === '-') {
      i1 = `(${IT(i)} + ${v1} / ${r1})`;
      i1 += `* 1000`;
      return i1;
    }

    else if (i1 === '+') {
      i1 = `(${v1} - ${IT(i)} / ${r1})`;
      i1 += ` * 1000`;
      return i1;
    }
  }


  function formula2(i2) {
    if (i2 === '-') {
      i2 = `(${IT(i)} + ${v2} / ${r2})`;
      i2 += `* 1000`;
      return i2;
    }

    else if (i2 === '+') {
      i2 = `(${v2} - ${IT(i)} / ${r2})`;
      i2 += ` * 1000`;
      return i2;
    }
  }

  function formula3(i3) {
    if (i3 === '-') {
      i3 = `(${IT(i)} + ${v3} / ${r3})`;
      i3 += `* 1000`;
      return i3;
    }

    else if (i3 === '+') {
      i3 = `(${v3} - ${IT(i)} / ${r3})`;
      i3 += ` * 1000`;
      return i3;
    }
  }

  /*---------------------*/
  function convinaciones(i) {
    if (i1 === '+' && i2 === '-' && i3 === '-') {
      i = - Number(validari3(i3)) - Number(validari2(i2)) + Number(validari1(i1));
      return Number(i);
    }

    else if (i1 === '+' && i2 === '-' && i3 === '+') {
      i = Number(validari3(i3)) - Number(validari2(i2)) + Number(validari1(i1));
      return Number(i);
    }

    else if (i1 === '-' && i2 === '-' && i3 === '+') {
      i = Number(validari3(i3)) - Number(validari2(i2)) - Number(validari1(i1));
      return Number(i);
    }


    else if (i1 === '-' && i2 === '+' && i3 === '-') {
      i = - Number(validari3(i3)) + Number(validari2(i2)) - Number(validari1(i1));
      return Number(i);
    }

    else if (i1 === '+' && i2 === '+' && i3 === '-') {
      i = - Number(validari3(i3)) + Number(validari2(i2)) + Number(validari1(i1));
      return Number(i);
    }

    else if (i1 === '-' && i2 === '+' && i3 === '+') {
      i = Number(validari3(i3)) + Number(validari2(i2)) - Number(validari1(i1));
      return Number(i);
    }

  }

  function mcm1(rt) {
    x = Number(r1);
    y = Number(r2);
    z = Number(r3);

    if (v1 === '0') {
      rt = (r2 * r3);
    }

    else if (v2 === '0') {
      rt = (r1 * r3);
    }

    else if (v3 === '0') {
      rt = (r1 * r2);
    }

    return Number(rt);


  }

  function mcm2(rt) {
    x = Number(r1);
    y = Number(r2);
    z = Number(r3);

    rt = x * y * z;
    return Number(rt);
  }

  /*-------------------------------*/
  function IT(i) {
    if (v1 === '0' && v2 !== '0' && v3 !== '0') {
      if (i1 === '+' && i2 === '-' && i3 === '-') {
        VA = (((((mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '-' && i3 === '+') {
        VA = (((((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '-' && i3 === '+') {
        VA = (((((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '+' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '+') {
        VA = ((((-(mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }
    }

    else if (v1 !== '0' && v2 === '0' && v3 !== '0') {
      if (i1 === '+' && i2 === '-' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '-' && i3 === '+') {
        VA = ((((-(mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '-' && i3 === '+') {
        VA = (((((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '-') {
        VA = (((((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '+' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '+') {
        VA = (((((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }
    }

    else if (v1 !== '0' && v2 !== '0' && v3 === '0') {
      if (i1 === '+' && i2 === '-' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '-' && i3 === '+') {
        VA = ((((-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '-' && i3 === '+') {
        VA = (((((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '-') {
        VA = (((((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '+' && i2 === '+' && i3 === '-') {
        VA = ((((-(mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '+') {
        VA = (((((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * mcm1(rt))).toFixed(2);
        i = VA;
        return i;
      }
    }

    else {
      if (i1 === '+' && i2 === '-' && i3 === '-') {
        VA = ((((-(v1))) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * r1)).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '-' && i3 === '+') {
        VA = ((((-(v3))) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * r3)).toFixed(2);
        i = VA;
        return i;
      }

      else if (i1 === '-' && i2 === '+' && i3 === '-') {
        VA = ((((-(v2))) * mcm2(rt)) / ((-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)) * r2)).toFixed(2);
        i = VA;
        return i;
      }

    }


  }
  /*---------------------------------------*/
  function operacion(i) {

    if (i1 === '+' && i2 === '-' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `${v2}/${r2}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r2) * v2}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '+' && i2 === '-' && i3 === '+') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v2}/${r2}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r2) * v2}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '-' && i3 === '+') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v2}/${r2}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r2) * v2}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '-' && i2 === '+' && i3 === '-') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${-(mcm1(rt) / r2) * v2}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '+' && i2 === '+' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `-${(mcm1(rt) / r2) * v2}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-((mcm1(rt) / r2) * v2) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '+' && i3 === '+') {
      i = `${va} -${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${-(mcm1(rt) / r2) * v2}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${-((mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r2) * v2) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

  }

  function operacion2(i) {

    if (i1 === '+' && i2 === '-' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `-${(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '+' && i2 === '-' && i3 === '+') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${-(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '-' && i3 === '+') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '-' && i2 === '+' && i3 === '-') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '+' && i2 === '+' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp + ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `-${(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '+' && i3 === '+') {
      i = `${va} -${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r3) * v3}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r3) * v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

  }

  function operacion3(i) {

    if (i1 === '+' && i2 === '-' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `-${(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '+' && i2 === '-' && i3 === '+') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${-(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${(-(mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '-' && i3 === '+') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}+${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) + ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }
    else if (i1 === '-' && i2 === '+' && i3 === '-') {
      i = `-${va} +${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `-${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '+' && i2 === '+' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp  ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `-${(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${(-(mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '+' && i3 === '+') {
      i = `${va} -${v1} /${r1}&nbsp&nbsp&nbsp + ${(v2)}-${(va)}/${r2}&nbsp&nbsp&nbsp + ${v3} -${va} /${r3} = 0<br><br>`;
      i += `${va}/${r1}&nbsp&nbsp&nbsp + ${v1}/${r1}&nbsp&nbsp&nbsp + ${v2}/${r2}&nbsp&nbsp&nbsp-${va}/${r2} &nbsp&nbsp&nbsp+${v3}/${r3}&nbsp&nbsp&nbsp-${va}/${r3}<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp -${va}/${r3}<br><br>`;
      i += `${(mcm1(rt) / r1) * v1}-${(mcm1(rt) / r2) * v2}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}/${mcm1(rt)}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${((mcm1(rt) / r1) * v1) - ((mcm1(rt) / r2) * v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${mcm1(rt)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

  }
  function operacion4(i) {

    if (i1 === '+' && i2 === '-' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `-${v1}/${r1}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-(v1)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${(r1)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '-' && i3 === '+') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `-${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `-${v3}/${r3}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-(v3)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${(r3)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

    else if (i1 === '-' && i2 === '+' && i3 === '-') {
      i = `${v1} -${va} /${r1}&nbsp&nbsp&nbsp - ${(va)}+${(v2)}/${r2}&nbsp&nbsp&nbsp - ${va} +${v3} /${r3} = 0<br><br>`;
      i += `${v1}/${r1}&nbsp&nbsp&nbsp - ${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}&nbsp&nbsp&nbsp+${v2}/${r2} &nbsp&nbsp&nbsp-${va}/${r3}&nbsp&nbsp&nbsp+${v3}/${r3}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${va}/${r1}&nbsp&nbsp&nbsp - ${va}/${r2}  &nbsp&nbsp&nbsp - ${va}/${r3}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp-${(mcm2(rt) / r1)}${va}-${(mcm2(rt) / r2)}${va}-${(mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `-${v2}/${r2}&nbsp&nbsp&nbsp = &nbsp&nbsp&nbsp${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}${va}/${mcm2(rt)}<br><br>`;
      i += `${va}&nbsp&nbsp&nbsp = (${-(v2)}) (${mcm2(rt)})/(${-(mcm2(rt) / r1) - (mcm2(rt) / r2) - (mcm2(rt) / r3)}) (${(r2)})&nbsp&nbsp&nbsp = ${IT(i)}v`;
      return i;
    }

  }




  function circuito(i) {
    if (v1 === '0' && v2 !== '0' && v3 !== '0') {
      return operacion(i);
    }

    else if (v1 !== '0' && v2 === '0' && v3 !== '0') {
      return operacion2(i);
    }

    else if (v1 !== '0' && v2 !== '0' && v3 === '0') {
      return operacion3(i);
    }
    else {
      return operacion4(i);
    }
  }


  res.send(


    `
        <head></head>

          <body>
          <h2> 1)${i1}i${i2}i2${i3}i3 = 0</h2><br><br>

            <h2>2)${circuito(i)}</h2><br>
            <h2> 3)i1 =${formula(i1)} = ${validari1(i1)}</h2><br>
            <h2> i2 =${formula2(i2)} = ${validari2(i2)}</h2><br>
            <h2> i3 =${formula3(i3)} = ${validari3(i3)}</h2><br>
            <h2>4) ${i1}(${validari1(i1)})${i2}(${validari2(i2)})${i3}(${validari3(i3)}) = ${convinaciones(i).toFixed(1)}


  
  </body >
  `
  );
});

app.listen(port, () => {
  console.log(`Server listening on localhost: ${port} `);
});