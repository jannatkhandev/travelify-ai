import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from './Logo';
import { Button } from "./ui/button";

const HeaderRoutes = () => {
    
    const routes = [
        { href: "/trips", label: "Trips" },
        { href: "/plan", label: "Plan" },
    ];
    return (
        <>
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="h-6 md:hidden w-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4">
                            {
                                routes.map((route, i) => (
                                    <Link key={i} href={route.href} className="block px-2 py-1 text-lg">
                                        {route.label}
                                    </Link>
                                ))}
                            
                        </nav>
                    </SheetContent>
                </Sheet>
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
                {(
                    routes.map((route, i) => (
                        <Button asChild variant="ghost" key={i}>
                            <Link href={route.href} className="text-sm font-medium transition-colors">
                                {route.label}
                            </Link>
                        </Button>
                    ))
                )}
            </nav>
        </>
    );
};

export default HeaderRoutes;