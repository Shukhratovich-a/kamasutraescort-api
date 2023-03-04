import { Controller, Get, Patch, Delete, Query, Param, Body } from "@nestjs/common";

import { SocialsSerivce } from "../service/advSocials.service";

import { SocialsDto } from "../dtos/advSocials.dto";

@Controller("socials")
export class SocialsController {
  constructor(private readonly socialsService: SocialsSerivce) {}

  @Get()
  async getAll(@Query("limit") limit: number, @Query("page") page: number) {
    return await this.socialsService.getAll(limit, page);
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    return await this.socialsService.getById(id);
  }

  @Patch(":id")
  async updateSocials(@Param("id") id: number, @Body() body: SocialsDto) {
    return await this.socialsService.updateSocials(id, body);
  }

  @Delete(":id")
  async deleteSocials(@Param("id") id: number) {
    return await this.socialsService.deleteSocials(id);
  }
}
