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

As referenced in ["A practical guide to testing Clerk Next.js applications,"](https://clerk-git-testing-post.clerkstage.dev/blog/testing-clerk-nextjs#conclusion) this repo includes tests for our sample application, Pup Party. If you'd like to follow along with the tutorial in the blog post, please [start here](https://github.com/lilybarrett/pup-party/tree/start-here).

Pup Party was originally built on top of Clerk's Next.js (App Router) template, which can be found [here](https://github.com/clerk/nextjs-auth-starter-template). 

## Configuring and running the app

```bash
git clone https://github.com/lilybarrett/pup-party.git
```

To run the example locally, you need to:

1. Sign up for a Clerk account at [https://clerk.com](https://go.clerk.com/31bREJU).
2. Go to the [Clerk dashboard](https://go.clerk.com/4I5LXFj) and create an application.
3. Set the required Clerk environment variables as shown in [the example `env` file](https://github.com/lilybarrett/pup-party/blob/main/.env.example).
4. Go to "Organization Settings" in your sidebar and enable Organizations
5. Run `npm install` the required dependencies.
6. Run `npm run dev` to launch the development server. You should be able to access the application locally at [http://localhost:3000](http://localhost:3000). 

## Running the tests

```
$ npm run test:jest
```

This command runs the E2E tests in headless mode:

```
$ npm run test:playwright
```

## Learn more

To learn more about Clerk and Next.js, check out the following resources:

- [Quickstart: Get started with Next.js and Clerk](https://go.clerk.com/vgWhQ7B)
- [Clerk Documentation](https://go.clerk.com/aNiTioa)
- [Next.js Documentation](https://nextjs.org/docs)
