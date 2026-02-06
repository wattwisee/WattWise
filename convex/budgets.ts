import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const getBudget = query({
  args: {},
  handler: async (ctx) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      return null;
    }
    return await ctx.db
      .query("budgets")
      .withIndex("by_userId", (q) => q.eq("userId", clerkUserId))
      .first();
  },
});

export const addBudget = mutation({
  args: {
    budget: v.number(),
    calculated_kWh_per_appliance: v.any(),
    monthly_total_kWh: v.number(),
    estimated_bill: v.number(),
    selected_provider: v.string(),
    rate_used: v.number(),
    time_stamps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("budgets", {
      userId: clerkUserId,
      budget: args.budget,
      calculated_kWh_per_appliance: args.calculated_kWh_per_appliance,
      monthly_total_kWh: args.monthly_total_kWh,
      estimated_bill: args.estimated_bill,
      selected_provider: args.selected_provider,
      rate_used: args.rate_used,
      time_stamps: args.time_stamps,
    });
  },
});


export const deleteBudget = mutation({
  args: { id: v.id("budgets") },
  handler: async (ctx, args) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    await ctx.db.delete(args.id);
  },
});

export const setBudget = mutation({
  args: { budget: v.number() },
  handler: async (ctx, args) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    // Check if budget exists for this user, update or insert
    const existingBudget = await ctx.db
      .query("budgets")
      .withIndex("by_userId", (q) => q.eq("userId", clerkUserId))
      .first();
    
    if (existingBudget) {
      return await ctx.db.patch(existingBudget._id, {
        budget: args.budget,
      });
    }
    
    return await ctx.db.insert("budgets", {
      userId: clerkUserId,
      budget: args.budget,
      calculated_kWh_per_appliance: {},
      monthly_total_kWh: 0,
      estimated_bill: 0,
      selected_provider: "",
      rate_used: 0,
      time_stamps: [],
    });
  },
});
