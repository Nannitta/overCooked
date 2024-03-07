export class BaseString {
  constructor(protected readonly value: string) {}
  public getValue(): string {
    return this.value;
  }
};
