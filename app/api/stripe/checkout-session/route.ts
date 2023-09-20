import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();
  console.log(priceId);
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be signed in to create a subscription" },
      { status: 401 }
    );
  }
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: session.user.stripeCustomerId!,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/projects`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    subscription_data: {
      metadata: {
        payingUserId: session.user.id,
      },
    },
  });

  if (!stripeSession.url) {
    return NextResponse.json(
      {
        message: "Could not create Stripe Session",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    { sessionId: stripeSession.id },
    {
      status: 200,
    }
  );
}
