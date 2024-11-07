/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async globalSearch(@Query('q') query: string) {
    console.log("Query recibido en el controlador:", query); // Para depuración
    const resultados = await this.searchService.search(query);
    console.log("Resultados devueltos por el servicio de búsqueda:", resultados);
    return resultados;
  }
}
