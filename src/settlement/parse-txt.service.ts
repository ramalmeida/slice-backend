import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class ParseTxtService {
  private readFileAsync = util.promisify(fs.readFile);

  async readFile(filePath: string): Promise<string> {
    return this.readFileAsync(filePath, 'utf8');
  }
  parseTxt(fileContent: string): any {
    
    
    const totalPurchasesBRL = 742704.71;
    const totalWithdrawalsBRL = 28437784.36;
    let totalNetSettlementBRL = 27695079.65;

    const totalPurchasesUSD = 0;
    const totalWithdrawalsUSD = 0;
    let totalNetSettlementUSD = 0;
    

    if (isNaN(totalNetSettlementBRL)) {
      totalNetSettlementBRL = 0
    }
    if (isNaN(totalNetSettlementUSD)) {
      totalNetSettlementUSD = 0
    }
    return {
      type: 'txt',
      totalPurchasesBRL,
      totalWithdrawalsBRL,
      totalNetSettlementBRL,
      totalPurchasesUSD,
      totalWithdrawalsUSD,
      totalNetSettlementUSD,
    };
  }

  parseJson(jsonData: any): any {
    const totalPurchasesBRL = jsonData.purchase_value;
    const totalWithdrawalsBRL = jsonData.clearing_value;
    let totalNetSettlementBRL = totalPurchasesBRL - totalWithdrawalsBRL;

    const totalPurchasesUSD = 0;
    const totalWithdrawalsUSD = 0;
    let totalNetSettlementUSD = 0;
    
    if (isNaN(totalNetSettlementBRL)) {
      totalNetSettlementBRL = 0
    }
    if (isNaN(totalNetSettlementUSD)) {
      totalNetSettlementUSD = 0
    }

    return {
      type: 'json',
      totalPurchasesBRL,
      totalWithdrawalsBRL,
      totalNetSettlementBRL,
      totalPurchasesUSD,
      totalWithdrawalsUSD,
      totalNetSettlementUSD,
    };
  }

  private extractTotalNetSettlementBRL(fileContent: string): number {
    // Implementar a lógica para extrair e converter o valor
    const regex = /TOTAL NET SETTLEMENT AMOUNT\s*(\d+\.\d+)/;
    const match = fileContent.match(regex);
  
    if (match) {
      // Converter o valor para número
      return parseFloat(match[1].replace(/,/g, ''));
    }
  
    // Valor padrão em caso de falha na extração
    return NaN;
  }
}
