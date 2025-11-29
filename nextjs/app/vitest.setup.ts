import { server } from "@/libs/msw";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const mockUseRouter = vi.fn();

vi.mock("next/router", () => ({
  useRouter: mockUseRouter,
}));

beforeAll(() => server.listen());

beforeEach(() => {
  mockUseRouter.mockReturnValue({
    replace: vi.fn(),
    push: vi.fn(),
  });
});

afterEach(() => {
  mockUseRouter.mockReset();
  server.resetHandlers();
});

afterAll(() => server.close());
