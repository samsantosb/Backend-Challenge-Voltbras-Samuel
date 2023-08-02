import { z } from "zod";
export class RequestUserDTO {
  name: string;
  email: string;
  password: string;

  private static schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  constructor(user: z.infer<typeof RequestUserDTO.schema>) {
    const validatedUser = RequestUserDTO.schema.safeParse(user);

    if (!validatedUser.success) {
      throw new Error(`Invalid user data: ${validatedUser.error}`);
    }

    this.name = validatedUser.data.name;
    this.email = validatedUser.data.email;
    this.password = validatedUser.data.password;
  }
}
