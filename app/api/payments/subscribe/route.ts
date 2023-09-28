import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { productId: variantId } = await req.json();
    console.log(variantId, process.env.LEMONSQUEEZY_STORE_ID);
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to create a subscription" },
        { status: 401 }
      );
    }
    const checkoutResp = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              product_options: {
                redirect_url: process.env.NEXTAUTH_URL + "/projects",
              },
              checkout_data: {
                email: session.user.email,
                custom: [session.user.id],
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: process.env.LEMONSQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: variantId,
                },
              },
            },
          },
        }),
        headers: {
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY_TEST}`,
        },
      }
    );

    const checkout = await checkoutResp.json();
    if (checkoutResp.status !== 201) {
      throw new Error(JSON.stringify(checkout));
    }
    return NextResponse.json(
      { checkoutURL: checkout.data.attributes.url },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "An error occured while processing payment",
    });
  }
}
