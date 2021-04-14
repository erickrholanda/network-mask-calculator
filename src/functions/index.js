export function validateIPaddress(ip) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      return (true);
    }

    return (false);
}

export function calcularMascaraSubrede(ip) {
    var table = [128, 64, 32, 16, 8, 4, 2, 1];
    var ips = ip.split('.').map( value => {
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
    const subips = value.split('.')
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
