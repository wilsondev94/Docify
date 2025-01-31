"use client";

import { ReactNode } from "react";
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import {
  Authenticated,
  AuthLoading,
  ConvexProvider,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import FullScreenLoader from "./reusableComps/FullScreenLoader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <ConvexProvider client={convex}>
          <Authenticated>{children}</Authenticated>
          <Unauthenticated>
            <div className="flex flex-col items-center justify-center min-h-screen">
              <SignIn routing="hash" />
            </div>
          </Unauthenticated>
          <AuthLoading>
            <FullScreenLoader label="Auth loading..." />
          </AuthLoading>
        </ConvexProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
