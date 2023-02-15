import NextAuth, { Session, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb'
import { faunadb } from '../../../services/fauna'


export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    // async session({ session }) {

    //   const userActiveSubscription = await faunadb.query(
    //     q.Get(
    //       q.Intersection(
    //         q.Match(
    //           q.Index('sub_by_user_ref'),
    //           q.Select(
    //             'ref',
    //             q.Get(
    //               q.Match(
    //                 q.Index('user_by_email'),
    //                 q.Casefold(session.user?.email)
    //               )
    //             )
    //           )
    //         ),
    //       )
    //     ),
    //   )

    //   return {
    //     ...session,
    //     activeSubscription: userActiveSubscription
    //   }

    //   // return {
    //   //   ...session,
    //   //   activeSubscription: null
    // }
  },

  async signIn({ user }) {

    const { email } = user

    try {
      await faunadb.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          ),
          q.Create(
            q.Collection("users"),
            { data: { email } }
          ),
          q.Get(
            q.Match(
              q.Index("user_by_email"),
              q.Casefold(user.email)
            )
          )
        )
      );

      return true

    } catch {
      return false
    }
  }
}
export default NextAuth(authOptions)