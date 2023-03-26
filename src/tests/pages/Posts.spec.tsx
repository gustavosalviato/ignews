import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts/";
import { createClient } from "../../../prismicio";

jest.mock("../../../prismicio");

const posts = [
  { slug: "slug1", title: "title1", content: "content1", updatedAt: "2020" },
];

describe("Posts pages", () => {
  it("should render the Posts page correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("title1")).toBeInTheDocument();
  });

  it("should loads the initial data", async () => {
    const getCreateClientMocked = jest.mocked(createClient);

    getCreateClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "uid1",
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
                text: "title2",
              },
            ],
          },
          last_publication_date: "2023-02-13T18:49:45+0000",
        },
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "uid1",
              title: "title1",
              content: "title2",
              updatedAt: "13 de fevereiro de 2023",
            },
          ],
        },
      })
    );
  });
});


