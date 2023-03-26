import { fireEvent, render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("should render correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    const { getByText } = render(<SignInButton />);

    expect(getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("should render correctly when user is  authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    } as any);

    const { getByText, debug } = render(<SignInButton />);

    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("should hits the signIn function when user is not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    const signInButton = screen.getByText("Sign in with GitHub");

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledWith("github");
  });

  it("should hits the signOut function when user is authenticated", () => {
    const signOutMocked = jest.mocked(signOut);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    } as any);

    render(<SignInButton />);

    const signOutButton = screen.getByText("John Doe");

    fireEvent.click(signOutButton)

    expect(signOutMocked).toHaveBeenCalled()
  });
});
