import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
//NEED TO ADD: appliances, usage_records, budgets, providers, recommendations, alerts
const schema = defineSchema({
  ...authTables,

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
  })
    .index("by_clerkId", ["clerkId"]),
  appliances: defineTable({
    userId: v.id("users"),
    name: v.string(), 
    wattage: v.number(),
  }) 
    .index("by_userId", ["userId"]),
  budgets: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    month: v.string(),
  })
    .index("by_userId", ["userId"]),
});

export default schema;