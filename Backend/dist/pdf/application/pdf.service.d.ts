/// <reference types="node" />
import { PdfApplicationInterface, PdfRepositoryInterface } from '../pdf.interface';
export declare class PdfService implements PdfApplicationInterface {
    private readonly pdfRepository;
    constructor(pdfRepository: PdfRepositoryInterface);
    loadPdf(): {
        url: string;
    };
    savePdf(buffer: Buffer, filename: string): void;
}
