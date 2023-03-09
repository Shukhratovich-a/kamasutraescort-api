import { extname, join } from "path";

import { Controller, Patch, UploadedFile, UseInterceptors, Param, Delete } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";

import { AvatarService } from "../services/avatar.service";

@Controller("avatar")
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: join(process.cwd(), "files", "avatar"),
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadAvatar(@Param("id") id: number, @UploadedFile() avatar: Express.Multer.File) {
    return await this.avatarService.uploadAvatar(id, avatar);
  }

  @Delete(":id")
  async deleteAvatar(@Param("id") id: number) {
    return await this.avatarService.deleteAvatar(id);
  }
}
