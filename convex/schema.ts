import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
//NEED TO ADD: budgets, providers, recommendations, alerts
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
    hoursPerDay: v.number(),
    type_of_appliance: v.optional(v.string()),
    quantity: v.optional(v.number()),
  }) 
    .index("by_userId", ["userId"]),

  //NO INPUTS YET  
  budgets: defineTable({
    userId: v.id("users"),
    budget: v.number(),
    calculated_kWh_per_appliance: v.any(),
    monthly_total_kWh: v.number(),
    estimated_bill: v.number(),
    selected_provider: v.string(),
    rate_used: v.number(),
    time_stamps: v.array(v.string()),
  })
    .index("by_userId", ["userId"]),
});

export default schema;