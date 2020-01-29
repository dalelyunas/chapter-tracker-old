export class Chapter {
  constructor(number, updatedAt) {
    this.number = number;
    this.updatedAt = updatedAt;
  }

  isValid() {
    return (
      typeof this.number === 'number' &&
      typeof this.updatedAt === 'number' &&
      !Number.isNaN(this.number) &&
      !Number.isNaN(this.updatedAt)
    );
  }
}
