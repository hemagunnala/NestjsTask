/// <reference types="multer" />
import { Response } from 'express';
export declare class PdfController {
    constructor();
    loadPdf(filename: string, res: Response): Promise<Response<any, Record<string, any>>>;
    savePdf(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
