import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";

export const createUserFactory = () => {
    const repository = new UsersRepositoryInMemory();
    const service = new CreateUserService(repository);
    const controller = new CreateUserController(service);
    return controller;
}