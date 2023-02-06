export class CreateUserDto {
  readonly nameTag: string;
  readonly password: string;
  readonly friends: string[];
  readonly deals: []; //TODO: Linter say Object[] is incorrect
}
