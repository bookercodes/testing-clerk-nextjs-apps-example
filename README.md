<p align="center">
  <a href="https://go.clerk.com/e3UDpP4" target="_blank" rel="noopener noreferrer">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/light-logo.png">
      <img src="./public/dark-logo.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    Pup Party application with example tests
  </h1>
</div>

As referenced in ["A practical guide to testing Clerk Next.js applications,"](https://clerk.com/blog/testing-clerk-nextjs) this repo allows you to follow along with adding tests for our sample application, Pup Party. If you'd like to see the finished branch, including tests, you can find that [here](https://github.com/bookercodes/testing-clerk-nextjs-apps-example/tree/finished).

Pup Party was originally built on top of Clerk's Next.js (App Router) template, which can be found [here](https://github.com/clerk/nextjs-auth-starter-template).

## Configuring and running the app

```bash
git clone https://github.com/bookercodes/testing-clerk-nextjs-apps-example
```

To run the example locally, you need to:

1. Sign up for a Clerk account at [https://clerk.com](https://go.clerk.com/31bREJU).
2. Go to the [Clerk dashboard](https://go.clerk.com/4I5LXFj) and create an application.
3. Set the required Clerk environment variables as shown in [the example `env` file](https://github.com/bookercodes/testing-clerk-nextjs-apps-example/blob/start-here/.env.example).
4. Run `npm install` the required dependencies.
5. Run `npm run dev` to launch the development server. You should be able to access the application locally at [http://localhost:3000](http://localhost:3000).

> Want to see additional commands for running Jest and Playwright tests? Check out the README in the `finished` branch [here](https://github.com/bookercodes/testing-clerk-nextjs-apps-example/tree/finished).
