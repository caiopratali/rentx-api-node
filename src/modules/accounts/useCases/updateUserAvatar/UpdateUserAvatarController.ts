import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { filename: avatar_file } = request.file;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatar_file });

    return response.sendStatus(204);
  }
}

export { UpdateUserAvatarController };
