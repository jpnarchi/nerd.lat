import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
    const body = await req.text();

    const headersList = await headers(); // Await headers()
    const signature = headersList.get("Stripe-Signature"); // Use it after awaiting

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_SECRET_WEBHOOK,
        );
    } catch (error) {
        return new Response("Webhook Error", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;

            const userId = session?.metadata?.userId
            const email = session?.metadata?.email 
            const currentTokens = session?.metadata?.currentTokens
            const newTokens = session?.metadata?.newTokens 
     
            // const userId = "j5712zevnt53c4kbrfgx1peqp97bc3fm"
            // const email = "olatickett@gmail.com"
            // const currentTokens = 50000
            // const newTokens = 50000

            console.log('user id is:', userId)
            console.log('current tokens are: ', currentTokens)
            console.log('new tokens are: ', newTokens)

            const totalTokens = Number(currentTokens) + Number(newTokens)

            console.log('total tokens are: ', totalTokens)

            try {
                await convex.mutation(api.users.UpdateToken, { userId, token: totalTokens });

                const result = await convex.query(api.users.GetUser, {
                    email: email,
                })

                console.log('result convex, ', result)

                console.log("Tokens updated successfully in Convex.");

            } catch (convexError) {
                console.error("Error updating tokens in Convex:", convexError);
                return new Response("Failed to update tokens", { status: 500 });
            }

            break;
        }
        default: {
            console.log("Unhandeled event");
        }
    }

    return new Response(null, { status: 200 });
}