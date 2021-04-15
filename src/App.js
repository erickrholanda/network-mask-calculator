import { useState } from 'react';
import InputMask from "react-input-mask";

import './App.css';

import { validateIPaddress,
  calcularMascaraSubrede,
  checkIpValue,
  checkTypeOfIp,
  getMaskDigit,
  getMaskSubnetwork } from './functions';
/**
 * 
 * @returns 
 * Device A:
 * 172.16.17.30/20
 * Device B:
 * 172.16.28.15/20
 */
function App() {
  var [value, setValue] = useState('');
  return (
    <div className="App">
      <label>
      <InputMask
        formatChars={{
          '9': '[0-9\.\/]',
        }}
        mask="99999999999999999"
        maskChar={null}
        alwaysShowMask={false}
        beforeMaskedValueChange={(newState, oldState, userInput) => {
          let value = newState.value.split('/')[0];
          let digitMask = newState.value.indexOf('/') !== -1;
          let mask = newState.value.split('/')[1] || '';
          const oldValue = oldState.value;
          let selection = newState.selection;
          let cursorPosition = selection ? selection.start : null;
          const result = checkIpValue(value)
          if (!result) {
            value = value.trim()
            // try to add . before the last char to see if it is valid ip address
            const newValue = value.substring(0, value.length - 1) + "." + value.substring(value.length - 1);
            if (checkIpValue(newValue)) {
              cursorPosition++
              selection = { start: cursorPosition, end: cursorPosition };
              value = newValue
            } else {
              value = oldValue
            }
          }
          if(value.split('.').length == 4 && digitMask) {
            value = value + '/' + mask;
          }
          return {
            value,
            selection
          };
        }}

        value={value}
        onChange={event => setValue(event.target.value)}
        />
        {/* <span>{value}</span> */}
      </label>
      {!!validateIPaddress(value) && <div className="ip-validation">
        <h3>IP Válido</h3>
        <div className="mask">
          <div className="block col-6">
            <div className="block-header">
              <h4>Ip do tipo {checkTypeOfIp(value).type}</h4>
            </div>
            <div className="block-content">
              {getMaskDigit(value) && <p>
                Mascara de subrede: {getMaskSubnetwork(value)}
                </p>}
            </div>
          </div>
        </div>
        <div className="mask">
          {calcularMascaraSubrede(value).map( (ip, key) => <div className="block" key={key}>
            <div className="block-header">
              <h4>{ip.digito}</h4>
            </div>
            <div className="block-content">
              <p><strong>Binário: </strong>{ip.binario.join('')}</p>
              <p><strong>Quant. de 1 - </strong>{ip.binario.filter(v => v === 1).length}</p>
              <p><strong>Quant. de 0 - </strong>{ip.binario.filter(v => v === 0).length}</p>
            </div>
          </div>)}
        </div>
      </div>}
    </div>
  );
}

export default App;
