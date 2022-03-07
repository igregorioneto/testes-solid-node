import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/iUsersRepositories";
import { CreateUserService } from "./CreateUserService";

describe("Create user", () => {

    let repository: IUsersRepository;
    let service: CreateUserService;

    beforeAll(() => {
        repository = new UsersRepositoryInMemory();
        service = new CreateUserService(repository);
    });

    it("should be able to create a new user", async () => {
        const userData: User = {
            name: "Test Name",
            email: "test@test.com.br",
            username: "testusername",
        };

        const user = await service.execute(userData);

        expect(user).toHaveProperty("id");
        expect(user.username).toBe("testusername");
    });

    it("should not be able to create an existing user", async () => {
        const userData: User = {
            name: "Test Existing Name",
            email: "testexisting@test.com.br",
            username: "testexisting",
        };

        await service.execute(userData);

        await expect(service.execute(userData)).rejects.toEqual(
            new Error("User already exists!")
        );
    });

});