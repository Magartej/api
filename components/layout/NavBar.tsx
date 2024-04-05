'use client'

import { UserButton } from "@clerk/nextjs";
import Container from "../container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { Button } from "../ui/button";
import SearchInput from "../Searchinput";
import { ModeToggle } from "../theme-toggle";
import { NavMenu } from "./NavMenue";

const NavBar = () => {
    const router = useRouter()
    const {userId} = useAuth()
    return ( 
        <div className="sticky top-0 border border-b-primary/10 
        bg-secondary">
            <Container>
                <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 cursor-pointer"
             onClick={() => router.push('/')}>
                <Image src='/logo.svg' alt="logo" 
                width='30' height='30' />
            <div className="font-bold text-xl">Room Rental</div>
            </div>
            <SearchInput />
            <div className="flex gap-3 items-center">
                <div>
                    <ModeToggle />
                    <NavMenu />
                    </div>
                <UserButton afterSignOutUrl="/" />
                {!userId && <>
                <Button onClick={() => router.push('/sign in')} variant='outline' size='sm'>Sign in</Button>
                <Button onClick={() => router.push('/sign in')} size='sm'>Sign up</Button>
                </>}
            </div>
                </div>
            </Container>
      </div> 
    );
}
 
export default NavBar;