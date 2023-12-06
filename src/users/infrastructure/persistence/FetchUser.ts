import type { UserRepository } from "../../domain/UserRepository";
import type { User } from "../../domain/User";

export class FetchUser implements UserRepository {
  async postUser(user: User): Promise<void> {
    await fetch("http://localhost:4000/users", {
      body: JSON.stringify(user),
    });
  }
}
