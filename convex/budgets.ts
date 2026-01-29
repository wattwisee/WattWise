import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const getBudget = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("budgets")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
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
    const clerkId = await getAuthUserId(ctx);  
    if (!clerkId) throw new Error("Not authenticated");
    
 
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();
    
    if (!user) throw new Error("User not found");
    
    return await ctx.db.insert("budgets", {
      userId: user._id,  //user._id is yung sa convex users
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
    await ctx.db.delete(args.id);
  },
});
