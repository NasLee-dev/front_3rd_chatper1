import { AuthService } from "../services/AuthService";
import { HeaderService } from "../services/HeaderService";
import { RouteService } from "../services/RouteService";
import { EventHandlers } from "../handlers/EventHandlers";

export class Application {
  constructor() {
    this.initializeServices();
    this.initializeEventHandlers();
    this.setupEventListeners();
  }

  initializeServices() {
    this.authService = new AuthService();
    this.routeService = new RouteService();
    this.headerService = new HeaderService();
  }

  initializeEventHandlers() {
    this.eventHandlers = new EventHandlers(
      this.authService,
      this.routeService,
      this.headerService,
      this.errorBoundary
    );
  }

  setupEventListeners() {
    // 네비게이션 이벤트
    document.addEventListener("click", (event) => {
      this.eventHandlers.handleNavigation(event);
    });

    // 인증 버튼 이벤트
    document.addEventListener("click", (event) => {
      this.eventHandlers.handleAuthButtons(event);
    });

    // 폼 제출 이벤트
    document.addEventListener("submit", (event) => {
      this.eventHandlers.handleFormSubmit(event);
    });

    // 전역 에러 처리
    window.addEventListener("error", (error) => {});

    // 전역 Promise rejection 처리
    window.addEventListener("unhandledrejection", (event) => {});
  }

  async initialize() {
    try {
      this.routeService.setupRoutes();
      this.headerService.updateHeader();
      await this.routeService.route();
    } catch (error) {
      console.error("Application 초기화 오류:", error);
    }
  }
}
