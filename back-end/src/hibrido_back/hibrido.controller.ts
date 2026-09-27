import { Controller, Get } from '@nestjs/common';
import { HibridoService } from './hibrido.service.js';

@Controller('hibrido_back')
export class HibridoController {

    constructor(private readonly hibridoService: HibridoService) {}

    @Get('get-key')
    getCurrent(){
        return this.hibridoService.getCurrent();
    }
}
