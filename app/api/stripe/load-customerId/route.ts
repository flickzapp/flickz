import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // update customerId for people who's already signed up
  try {
    const users = await db.user.findMany({
      where: {
        stripeCustomerId: null,
      },
    });
    if (users.length === 0) {
      return NextResponse.json(
        {
          message: "No users to update",
        },
        {
          status: 200,
        }
      );
    }
    for (const user of users) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name!,
      });
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }
    return NextResponse.json({
      message: `Successfully set customerIds for ${users.length} users`,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: `Error occured while setting customerIds`,
      },
      {
        status: 500,
      }
    );
  }
}
