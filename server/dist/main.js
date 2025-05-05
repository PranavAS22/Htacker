"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    app.enableCors({
        origin: ['http://localhost:8081'],
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(3000, '0.0.0.0');
    console.log('Server running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map