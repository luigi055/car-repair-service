import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
// TODO:
//Implement the extension matcher to improve readability in test assertions
// so far it is not working as expected
// import matchers from "@testing-library/jest-dom/matchers";
// expect.extend(matchers);

// needed to replace the actual fetch implementation used by the react-router-dom createBrowserRouter
const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();
afterEach(() => {
	cleanup();
});
