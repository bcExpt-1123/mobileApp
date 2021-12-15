import fetch from 'node-fetch';
import LoginCookie from '../loginCookie';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';
import { parseAmountString } from '../helpers';

export default class BBChecking {
  async getBalance() {
    const balanceUrl = 'servico/ServicoSaldo/saldo';

    const response = await fetch(`${BASE_ENDPOINT}${balanceUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: LoginCookie.getGlobal(),
      },
      method: 'POST',
    });

    const text = await response.text();
    const { servicoSaldo } = JSON.parse(text);

    const { saldo } = servicoSaldo;

    return parseAmountString(saldo);
  }
}
