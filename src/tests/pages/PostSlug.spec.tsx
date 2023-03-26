import { render, screen } from "@testing-library/react";
import Posts, { getServerSideProps } from "../../pages/posts/[slug]";
import { getSession } from "next-auth/react";
import { createClient } from "../../../prismicio";
const post = {
  slug: "test-post",
  title: "Test post",
  content: "<p>Test post content</p>",
  updatedAt: "10 de abril",
};

jest.mock("next-auth/react");
jest.mock("../../../prismicio");

describe("An unique Post", () => {
  it("should render the post", () => {
    render(<Posts post={post} />);
    expect(screen.getByText("Test post")).toBeInTheDocument();
    expect(screen.getByText("Test post content")).toBeInTheDocument();
  });

  it("should redirect to home page if user is not logged in", async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      userActiveSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "test-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("should loads the initial data", async () => {
    const createClientMocked = jest.mocked(createClient);

    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      userActiveSubscription: "test-subscription",
    } as any);

    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading",
              text: "title1",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Post content",
            },
          ],
        },
        last_publication_date: "2023-02-13T18:49:45+0000",
      }),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "test-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "test-post",
            title: "title1",
            content: "<p>Post content</p>",
            updatedAt: "13 de fevereiro de 2023",
          },
        },
      })
    );
  });
});
