import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages/index";

import { stripe } from "../../services/stripe";

jest.mock("next-auth/react");

jest.mock("../../services/stripe");

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

describe("Home Page", () => {
  it("should render the home page correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("should loads the initial data", async () => {
    const retrieveStripePriceMocked = jest.mocked(stripe.prices.retrieve);

    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
