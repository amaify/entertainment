import { render } from "@testing-library/react";
import SvgIcon from "./svg";

describe("SVG component", () => {
  it("should render the correct icon based on the variant passed to it", () => {
    const { container } = render(<SvgIcon variant="tvSeriesIcon" />);
    const svgElement = container.querySelector("[data-icon='tvSeriesIcon']") as HTMLImageElement;
    expect(svgElement).toBeInTheDocument();
  });
});
