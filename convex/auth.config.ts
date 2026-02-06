export default {
  providers: [
    {
      domain: process.env.CLERK_FRONTEND_API_URL || "https://engaging-hippo-52.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
}
