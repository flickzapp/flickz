import { Buffer } from "buffer";
import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";
import { client } from "@/lib/lemons";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await rawBody(Readable.from(Buffer.from(await request.text())));
  const headersList = headers();
  const payload = JSON.parse(body.toString());
  const sigString = headersList.get("x-signature");
  const secret = process.env.LEMONSQUEEZY_SIGNATURE_SECRET as string;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const signature = Buffer.from(
    Array.isArray(sigString) ? sigString.join("") : sigString || "",
    "utf8"
  );

  // Check if the webhook event was for this product or not
  if (
    parseInt(payload.data.attributes.product_id) !==
    parseInt(process.env.LEMONSSQUEEZY_PRODUCT_ID as string)
  ) {
    return NextResponse.json({ message: "Invalid product" }, { status: 403 });
  }

  // validate signature
  if (!crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const userId = payload.meta.custom_data[0];

  // Check if custom defined data i.e. the `userId` is there or not
  if (!userId) {
    return NextResponse.json(
      { message: "No userId provided" },
      { status: 403 }
    );
  }

  switch (payload.meta.event_name) {
    case "subscription_created": {
      const subscription = await client.retrieveSubscription({
        id: payload.data.id,
      });

      await db.user.update({
        where: { id: userId },
        data: {
          subscriptionId: `${subscription.data.id}`,
          customerId: `${payload.data.attributes.customer_id}`,
          variantId: `${subscription.data.attributes.variant_id}`,
          currentPeriodEnd: subscription.data.attributes.renews_at,
          isActive: true,
        },
      });
      return NextResponse.json({
        message: "Webhook received",
      });
    }

    case "subscription_updated": {
      const subscription = await client.retrieveSubscription({
        id: payload.data.id,
      });

      const user = await db.user.findUnique({
        where: { subscriptionId: `${subscription.data.id}` },
        select: { subscriptionId: true },
      });

      if (!user || !user.subscriptionId) return;

      await db.user.update({
        where: { subscriptionId: user.subscriptionId },
        data: {
          variantId: `${subscription.data.attributes.variant_id}`,
          currentPeriodEnd: subscription.data.attributes.renews_at,
          isActive:
            new Date(subscription.data.attributes.renews_at) > new Date(),
        },
      });
      return NextResponse.json({
        message: "Webhook received",
      });
    }

    case "subscription_expired": {
      const subscription = await client.retrieveSubscription({
        id: payload.data.id,
      });
      await db.user.update({
        where: {
          subscriptionId: `${subscription.data.id}`,
        },
        data: {
          isActive: false,
        },
      });
      return NextResponse.json({
        message: "Webhook received",
      });
    }
    case "subscription_cancelled": {
      const subscription = await client.retrieveSubscription({
        id: payload.data.id,
      });
      await db.user.update({
        where: {
          subscriptionId: `${subscription.data.id}`,
        },
        data: {
          isActive: false,
        },
      });
      return NextResponse.json({
        message: "Webhook received",
      });
    }

    default: {
      return;
    }
  }
}
