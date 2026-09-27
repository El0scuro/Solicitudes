import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { HibridoService } from './hibrido.service.js';

@Controller('hibrido_front')
export class HibridoController {

    constructor(private readonly hibridoService: HibridoService) {}

    @Get('get-key')
    getCurrent(){
        return this.hibridoService.getCurrent();
    }

    @Post('metadatos_front')
    postMetadatos(@Body() body :{version: number, fechaActual: string, fechaVencimiento: string}){
        return this.hibridoService.create(body)
    }

    @Get('vencimiento')
    getVencimiento(){
        return this.hibridoService.metadatos()
    }

    @Patch('actualizar-metadatos')
    actualizar(@Body() body :{version: number}){
        return this.hibridoService.updateMetadatos(body);
    }
}
