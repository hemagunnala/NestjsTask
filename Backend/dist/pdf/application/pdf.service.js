"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
class PdfService {
    constructor(pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    loadPdf() {
        return { url: 'https://example.com/example.pdf' };
    }
    savePdf(buffer, filename) {
        this.pdfRepository.savePdf(buffer, filename);
    }
}
exports.PdfService = PdfService;
//# sourceMappingURL=pdf.service.js.map