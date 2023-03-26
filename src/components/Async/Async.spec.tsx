import { render, screen } from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("should be able to see text and button on screen", async () => {
    render(<Async />);

    expect(screen.getByTestId("hello-world")).toBeInTheDocument();
    expect(await screen.findByText("Button")).toBeInTheDocument();
  });
});
