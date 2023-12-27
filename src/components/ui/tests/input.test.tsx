import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../input";

describe("Input component", () => {
  it("should render the input search icon if the variant is searchInput", () => {
    const { container } = render(<Input variant="searchInput" />);
    const svgElement = container.querySelector("[data-icon='searchIcon']") as HTMLImageElement;
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(svgElement).toBeInTheDocument();
  });

  it("should not render the input search icon if the variant is not searchInput", () => {
    const { container } = render(<Input variant="formInput" />);
    const svgElement = container.querySelector("[data-icon='search']") as HTMLImageElement;
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(svgElement).not.toBeInTheDocument();
  });

  it("should render the error message if there is an error", () => {
    render(<Input variant="formInput" name="email" inputError={{ email: "wrong format" }} />);
    const errorMessageElement = screen.getByTestId("errorMessage");
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent("wrong format");
  });
});

describe("Input element value behaviour", () => {
  it("should set the entered value in the input element", () => {
    render(<Input variant="formInput" name="email" />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "the godfather" } });
    expect(inputElement.value).toBe("the godfather");
  });
});
