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
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("appliances")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const addAppliance = mutation({
  args: {
    name: v.string(),
    wattage: v.number(),
    hoursPerDay: v.number(),
    type_of_appliance: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const clerkId = await getAuthUserId(ctx);  
    if (!clerkId) throw new Error("Not authenticated");
    
 
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();
    
    if (!user) throw new Error("User not found");
    
    return await ctx.db.insert("appliances", {
      userId: user._id,  //user._id is yung sa convex users
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
    await ctx.db.delete(args.id);
  },
});