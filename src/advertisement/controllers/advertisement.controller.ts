import { Controller, Get, Post, Patch, Delete, Param, Query, Body, ParseEnumPipe, ParseIntPipe } from "@nestjs/common";

import { AdvertisementSerivce } from "../services/advertisement.service";

import { TypeEnum } from "src/enums/type.enum";
import { AdvertisementDto } from "../dtos/advertisement.dto";

@Controller("advertisement")
export class AdvertisementController {
  constructor(private readonly advertisementSerive: AdvertisementSerivce) {}

  @Get()
  async getAll(@Query("limit") limit: number, @Query("page") page: number) {
    return await this.advertisementSerive.getAll(limit, page);
  }

  @Get("username/:username")
  async getByUsername(@Param("username") username: string, @Query("limit") limit: number, @Query("page") page: number) {
    return await this.advertisementSerive.getByUsername(username, limit, page);
  }

  @Get("type/:type")
  async getByType(
    @Param("type", new ParseEnumPipe(TypeEnum)) type: TypeEnum,
    @Query("limit") limit: number,
    @Query("page") page: number,
  ) {
    return await this.advertisementSerive.getByType(type, limit, page);
  }

  @Get(":searchName")
  async getBySearchName(@Param("searchName") searchName: string) {
    return await this.advertisementSerive.getBySearchName(searchName);
  }

  @Post(":id")
  async create(@Param("id", ParseIntPipe) id: number, @Body() body: AdvertisementDto) {
    return this.advertisementSerive.create(id, body);
  }

  @Patch(":id")
  async edit(@Param("id", ParseIntPipe) id: number, @Body() body: AdvertisementDto) {
    return this.advertisementSerive.edit(id, body);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.advertisementSerive.delete(id);
  }
}
