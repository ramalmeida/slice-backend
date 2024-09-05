import { Controller, Post, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SettlementService } from './settlement.service';
import { ParseTxtService } from './parse-txt.service';
import { Express } from 'express';
import * as multer from 'multer';

@Controller('settlement')
export class SettlementController {
  constructor(
    private readonly settlementService: SettlementService,
    private readonly parseTxtService: ParseTxtService,
  ) {}

  @Post('upload-txt')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads', // Pasta onde os arquivos serão salvos
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.txt');
        },
      }),
      limits: { fileSize: 200 * 1024 * 1024 }, // Limite de tamanho do arquivo (200MB)
  }),)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado');
    }
    const filePath = file.path;
    const fileContent = await this.parseTxtService.readFile(filePath);

    const settlementData = this.parseTxtService.parseTxt(fileContent);
    
    await this.settlementService.createSettlement(settlementData);
    return { message: 'Arquivo processado com sucesso!' };
  }

  @Post('upload-json')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads', // Pasta onde os arquivos serão salvos
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.json');
        },
      }),
      limits: { fileSize: 200 * 1024 * 1024 }, // Limite de tamanho do arquivo (200MB)
    }),
  )
  async uploadJson(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado');
    }
    const filePath = file.path;
    const fileContent = await this.parseTxtService.readFile(filePath);

    const settlementData = this.parseTxtService.parseJson(fileContent);

    await this.settlementService.createSettlement(settlementData);
    return { message: 'JSON processado com sucesso!' };
  }

  @Get()
  async getAllSettlements() {
    return this.settlementService.getAllSettlements();
  }
}
