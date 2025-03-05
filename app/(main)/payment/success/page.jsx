'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Lookup from "@/data/Lookup";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <Check className="w-12 h-12 rounded-full bg-[#008d78]/30 text-[#008d78] p-2"/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-lg leading-6 font-medium">{Lookup.SUCCESS_PAYMENT_TEXT}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{Lookup.SUCCESS_PAYMENT_DESCRIPTION}</p>
                        <Button className="mt-5 sm:mt-6 w-full" asChild>
                            <Link href="/">{Lookup.GO_TO_HOME_TEXT}</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    );
}