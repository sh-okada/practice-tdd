/** biome-ignore-all lint/suspicious/noExplicitAny: allowed any type */
import { server } from "@/libs/msw";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
