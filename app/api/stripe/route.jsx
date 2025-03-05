// import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    typescript: false,
});

export async function POST(req) {
    try{
        const { price, currentTokens, newTokens, userId, email } = await req.json()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name: `${newTokens} Tokens`,
                        },
                        unit_amount: price * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: userId,
                newTokens: newTokens,
                currentTokens: currentTokens,
                email: email,
            },
        });

        return NextResponse.json({ sessionUrl: session.url });

        // return new NextResponse("Success", { status: 200 })
    }catch(e){
        console.error("STRIPE ERROR", e)
        return new NextResponse("Internal Error", { status: 500 });
    }
}