import { AdminClient } from "./controllers/admin.controller";
import { AIClient } from "./controllers/ai.controller";
import { AuthClient } from "./controllers/auth.controller";
import { StudentClient } from "./controllers/student.controller";
import { TeacherClient } from "./controllers/teacher.controller";
import { TestClient } from "./controllers/test.controller";
import { UsersClient } from "./controllers/user.controller";
import { TokenPair } from "./models/token.model";

export class ApiClient {
  public auth: AuthClient;
  public users: UsersClient;
  public admin: AdminClient;
  public teacher: TeacherClient;
  public test: TestClient;
  public student: StudentClient;
  public ai: AIClient;

  constructor(baseURL: string = "/api") {
    this.auth = new AuthClient(baseURL);
    this.users = new UsersClient(baseURL);
    this.admin = new AdminClient(baseURL);
    this.teacher = new TeacherClient(baseURL);
    this.test = new TestClient(baseURL);
    this.student = new StudentClient(baseURL);
    this.ai = new AIClient(baseURL);

    this.setupTokenSharing();
  }

  private setupTokenSharing(): void {
    const clients = [
      this.users,
      this.admin,
      this.teacher,
      this.test,
      this.student,
      this.ai,
    ];

    // Когда auth клиент получает токены, делимся ими с другими клиентами
    const originalSetTokens = this.auth.setTokens.bind(this.auth);
    this.auth.setTokens = (tokens: TokenPair) => {
      originalSetTokens(tokens);
      clients.forEach((client) => client.setTokens(tokens));
    };

    // Когда auth клиент очищает токены, очищаем у других клиентов
    const originalClearTokens = this.auth.clearTokens.bind(this.auth);
    this.auth.clearTokens = () => {
      originalClearTokens();
      clients.forEach((client) => client.clearTokens());
    };
  }

  public setTokens(tokens: TokenPair): void {
    this.auth.setTokens(tokens);
  }

  public clearTokens(): void {
    this.auth.clearTokens();
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}

export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL);
