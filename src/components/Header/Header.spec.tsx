import { render } from "@testing-library/react";
import { Header } from ".";
jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Header component", () => {
  it("should render correctly", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Posts")).toBeInTheDocument();
  });
});
