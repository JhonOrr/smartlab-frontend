import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();
        // const user = data.user;

        if (response.ok && data.user && data.key) {
          return {
            email: data?.user.cliente,
            name: data?.user.first_name + ' ' + data?.user.last_name,
          }
        } else return null;
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user = { ...session.user };
      if (user) {
        session.user.name = user.name;
        session.user.email = user.cliente;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
