type Data = {
  [key: string]: any;
} | null;

export class ApiResponse {
  private message: string;
  private error?: string;

  constructor(message: string, error?: string) {
    this.message = message;
    this.error = error;

    if (error) {
      console.error(error);
    }
  }
}
