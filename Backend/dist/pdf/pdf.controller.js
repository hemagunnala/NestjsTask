"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const path = require("path");
let PdfController = exports.PdfController = class PdfController {
    constructor() { }
    async loadPdf(filename, res) {
        try {
            const filePath = path.join(process.cwd(), 'src', 'pdf', 'file', filename);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'PDF not found', filePath: filePath });
            }
            const pdfFile = fs.createReadStream(filePath);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
            pdfFile.pipe(res);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to load PDF' });
        }
    }
    async savePdf(file, res) {
        try {
            if (!file) {
                return res.status(400).json({ message: 'No PDF file provided' });
            }
            const filePath = path.join(process.cwd(), 'src', 'pdf', 'file', "example-saved.pdf");
            fs.writeFileSync(filePath, file.buffer);
            return res.json({ message: 'PDF saved successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to save PDF', error: error });
        }
    }
};
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "loadPdf", null);
__decorate([
    (0, common_1.Post)('save'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "savePdf", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    __metadata("design:paramtypes", [])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map