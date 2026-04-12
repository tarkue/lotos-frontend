import { AdminClient } from "./controllers/admin.controller";
import { AIClient } from "./controllers/ai.controller";
import { AuthClient } from "./controllers/auth.controller";
import { CourseClient } from "./controllers/course.controller";
import { StudentClient } from "./controllers/student.controller";
import { TeacherClient } from "./controllers/teacher.controller";
import { TestClient } from "./controllers/test.controller";
import { UsersClient } from "./controllers/user.controller";
import { TokenPair } from "./models/token.model";

const DEFAULT_API_BASE_URL = "/api";

declare const process: {
  env: {
    NEXT_PUBLIC_API?: string;
    SERVER_API_URL?: string;
  };
};

const resolveApiBaseUrl = (): string => {
  const publicApiUrl = process.env.NEXT_PUBLIC_API;
  const serverApiUrl = process.env.SERVER_API_URL ?? publicApiUrl;

  if (typeof window === "undefined") {
    return serverApiUrl ?? DEFAULT_API_BASE_URL;
  }

  return publicApiUrl ?? serverApiUrl ?? DEFAULT_API_BASE_URL;
};

export class ApiClient {
  private baseURL: string;
  public auth: AuthClient;
  public users: UsersClient;
  public admin: AdminClient;
  public teacher: TeacherClient;
  public test: TestClient;
  public student: StudentClient;
  public ai: AIClient;
  public course: CourseClient;

<<<<<<< HEAD
  constructor(baseURL: string = DEFAULT_API_BASE_URL) {
=======
  constructor(baseURL: string = process.env.NEXT_PUBLIC_API!) {
>>>>>>> a5304cfe6f94fe8689819d657e06c60b48ee0791
    this.baseURL = baseURL;
    this.auth = new AuthClient(baseURL);
    this.users = new UsersClient(baseURL);
    this.admin = new AdminClient(baseURL);
    this.teacher = new TeacherClient(baseURL);
    this.test = new TestClient(baseURL);
    this.student = new StudentClient(baseURL);
    this.ai = new AIClient(baseURL);
    this.course = new CourseClient(baseURL);

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
      this.course,
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

  public getFile(url: string) {
    return new URL(url, this.baseURL).toString();
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

export const api = new ApiClient(resolveApiBaseUrl());
