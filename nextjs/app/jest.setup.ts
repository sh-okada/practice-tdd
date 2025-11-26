/** biome-ignore-all lint/suspicious/noExplicitAny: allowed any type */
import { server } from "@/libs/msw";
import "@testing-library/jest-dom";

const mockUseRouter = jest.fn();

jest.mock("next/router", () => ({
  useRouter: mockUseRouter,
}));

beforeAll(() => server.listen());

beforeEach(() => {
  mockUseRouter.mockReturnValue({
    replace: jest.fn(),
    push: jest.fn(),
  });
});

afterEach(() => {
  mockUseRouter.mockReset();
  server.resetHandlers();
});

afterAll(() => server.close());
