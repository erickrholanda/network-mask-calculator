export function validateIPaddress(ip) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip.split('/')[0])) {
      return (true);
    }

    return (false);
}

export function calcularMascaraSubrede(ip) {
    var table = [128, 64, 32, 16, 8, 4, 2, 1];
    var ips = ip.split('/')[0].split('.').map( value => {
        return {
            digito: value,
            binario: table.map(idx => {
            var digito = value < idx ? 0 : 1;
            if (value >= idx) {
                value = value - idx
            }
            return digito
        })
    }
    });
    console.log(ips);
    return ips;
}

export function checkIpValue(value) {
    const subips = value.split('/')[0].split('.')
    if (subips.length > 4) {
      return false
    }
    const invalidSubips = subips.filter(ip => {
      ip = parseInt(ip)
      return ip < 0 || ip > 255
    })
    if (invalidSubips.length !== 0) {
      return false
    }
    let emptyIpCount = 0
    subips.forEach(ip => {
      if (ip === "") {
        emptyIpCount++
      }
    })
    if (emptyIpCount > 1) {
      return false
    }
    return true
}

export function checkTypeOfIp(ip) {
  var first = parseInt(ip.split('/')[0].split('.')[0]);
  if (first <= 127) {
    return {
      type: 'A',
      count: 16777214,
    };
  }
  else if (first >= 128 && first <= 191) {
    return {
      type: 'B',
      count: 65534,
    };
  }
  else {
    return {
      type: 'C',
      count: 254
    }
  }
}
export function calculateMask(binario) {
  if (!binario) return ''
  const tableMask = [
    2**7,
    2**6,
    2**5,
    2**4,
    2**3,
    2**2,
    2**1,
    2**0
  ]
  console.log(binario.split(''));
  var total = 0;
  binario.split('').map( (value, key) => {
    console.log(value, key, tableMask[key]);
    total += tableMask[key]*value;
    if (value > 0) {
    }
  });
  return total;
}
export function getMaskDigit(ip) {
  return ip.split('/')[1] !== undefined && ip.split('/')[1] !== '';
}

export function getMaskSubnetwork(ip) {
  var mask = ip.split('/')[1];
  if (mask) {
    mask = parseInt(mask);
    var binario = [];
    var subnetwork = [];
    for(var index = 0, limit = 8*4; index < limit; index++) {
      if (index <= mask) {
        binario.push(1)
      }
      else {
        binario.push(0)
      }
      if (binario.length == 8) {
        subnetwork.push(binario.join(''))
        binario = []
      }
    }

    return subnetwork.map(sub => calculateMask(sub)).join('.');
  }

  return '';
}