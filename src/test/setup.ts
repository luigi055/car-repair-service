import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
// import matchers from "@testing-library/jest-dom/matchers";
// expect.extend(matchers);

// needed to replace the actual fetch implementation used by the react-router-dom createBrowserRouter
const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();
afterEach(() => {
	cleanup();
});
