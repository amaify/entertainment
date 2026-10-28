import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./search-input";

const mockReplace = jest.fn();
let mockPathname = "/";
let mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
    useRouter: () => ({ replace: mockReplace }),
    usePathname: () => mockPathname,
    useSearchParams: () => mockSearchParams,
}));

function renderSearchInput({ pathname = "/", query = "" } = {}) {
    mockPathname = pathname;
    mockSearchParams = new URLSearchParams(query);
    render(<SearchInput placeholderText="Search for movies or TV series" />);
    return screen.getByRole("textbox") as HTMLInputElement;
}

beforeAll(() => {
    global.IntersectionObserver = jest.fn(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    })) as unknown as typeof IntersectionObserver;
});

beforeEach(() => {
    mockReplace.mockClear();
    sessionStorage.clear();
});

describe("SearchInput clear button", () => {
    it("should only show the clear button when there is a value", () => {
        const inputElement = renderSearchInput();
        expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: "done" } });
        expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
    });

    it("should go back to the previous page on the search page", () => {
        sessionStorage.setItem("previousPath", "/movies");
        renderSearchInput({ pathname: "/search", query: "q=dune" });
        fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
        expect(mockReplace).toHaveBeenLastCalledWith("/movies");
    });

    it("should go back to the home page when there is no previous page", () => {
        renderSearchInput({ pathname: "/search", query: "q=dune" });
        fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
        expect(mockReplace).toHaveBeenLastCalledWith("/");
    });
});
