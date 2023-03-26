import { render, screen } from "@testing-library/react";
import PreviewPost, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";
import { createClient } from "../../../prismicio";
import { useRouter } from "next/router";
const post = {
  slug: "test-post",
  title: "Test post",
  content: "Test content",
  updatedAt: "01 de fevereiro de 2021",
};

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("../../../prismicio");

jest.mock("next-auth/react");

describe("Preview Page", () => {
  it("should render preview page correctly", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    render(<PreviewPost post={post} />);

    expect(screen.getByText("Test post")).toBeInTheDocument();
  });

  it("should loads the inital data", async () => {
    const createClientMocked = jest.mocked(createClient);

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

    const response = await getStaticProps({
      params: {
        slug: "test-slug",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "test-slug",
            title: "title1",
            content: "<p>Post content</p>",
            updatedAt: "13 de fevereiro de 2023",
          },
        },
      })
    );
  });

  it("should redirect to page post if already have an active subscription", () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        userActiveSubscription: "test-subscription",
      },
    } as any);

    
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<PreviewPost post={post}/> )

    expect(pushMock).toHaveBeenCalledWith('/posts/test-post')
  });
});
