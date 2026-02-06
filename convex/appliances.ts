import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const applianceList = [
  "Air Conditioner",
  "Electric Fan",
  "Refrigerator",
  "Television",
  "Rice Cooker",
  "Electric Kettle",
  "Microwave Oven",
  "Washing Machine",
  "Clothes Iron",
  "Water Heater / Shower",
  "Laptop / Desktop Computer",
  "Lighting (Bulbs / LEDs)",
  "Mobile Phone Charger",
  "Electric Stove / Induction Cooker",
  "Other (Custom)"
];

export const getUserAppliances = query({
  args: {},
  handler: async (ctx) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      return [];
    }
    return await ctx.db
      .query("appliances")
      .withIndex("by_userId", (q) => q.eq("userId", clerkUserId))
      .collect();
  },
});

export const addAppliance = mutation({
  args: {
    name: v.string(),
    wattage: v.number(),
    hoursPerDay: v.number(),
    type_of_appliance: v.optional(v.string()),
    quantity: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("appliances", {
      userId: clerkUserId,
      name: args.name,
      wattage: args.wattage,
      hoursPerDay: args.hoursPerDay,
      type_of_appliance: args.type_of_appliance,
      quantity: args.quantity,
    });
  },
});


export const deleteAppliance = mutation({
  args: { id: v.id("appliances") },
  handler: async (ctx, args) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    // Verify the appliance belongs to the user before deleting
    const appliance = await ctx.db.get(args.id);
    if (appliance && appliance.userId === clerkUserId) {
      await ctx.db.delete(args.id);
    }
  },
});

export const clearAllAppliances = mutation({
  args: {},
  handler: async (ctx) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }
    // Get all appliances for this user and delete them
    const appliances = await ctx.db
      .query("appliances")
      .withIndex("by_userId", (q) => q.eq("userId", clerkUserId))
      .collect();
    
    for (const appliance of appliances) {
      await ctx.db.delete(appliance._id);
    }
  },
});
