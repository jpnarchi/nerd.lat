import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Lookup from "@/data/Lookup";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XCircle className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2"/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-lg leading-6 font-medium">{Lookup.CANCELED_PAYMENT_TEXT}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{Lookup.CANCELED_PAYMENT_DESCRIPTION}</p>
                        <Button className="mt-5 sm:mt-6 w-full" asChild>
                            <Link href="/">{Lookup.GO_TO_HOME_TEXT}</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    );
}
