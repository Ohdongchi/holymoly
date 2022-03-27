import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";


export const setupSwagger = (app: INestApplication): void => {
    const options= new DocumentBuilder()
        .setTitle('Holy moly web API Docs')
        .setDescription("Holy moly web API Description")
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
}

