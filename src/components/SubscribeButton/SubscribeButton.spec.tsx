import { render, fireEvent, screen } from "@testing-library/react";
import { SubscribeButton } from ".";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react");

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

describe("SubscribeButton component", () => {
  it("should render correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    const { getByText } = render(<SubscribeButton />);

    expect(getByText("Subscribe now")).toBeInTheDocument();
  });

  it("should redirect user to sign in when it's not authenticated", () => {
    const signInButtonMocked = jest.mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInButtonMocked).toHaveBeenCalledWith("github");
  });

  it("should redirects to posts when user already has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);

    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
        userActiveSubscription: "fake-sub",
        expires: "fake-expires",
      },
      status: "authenticated",
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(useRouterMocked).toHaveBeenCalled();
  });
});
