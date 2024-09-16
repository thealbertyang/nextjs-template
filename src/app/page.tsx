"use client";

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Flex, Section, Button, Text, Box, Heading } from '@radix-ui/themes'
import { SiteHeader } from "@/ui/components/SiteHeader";

export default function Home() {
  return (
    <Flex direction="column" className="min-h-dvh w-full bg-radial">
      <SiteHeader ghost />
      <Flex flexGrow="1" direction="column" justify="center" align="center">
        <Section size="3">
          <Flex direction="column" align="center" gap="6" className="max-w-[720px]">
            <Button variant="surface" radius="full" size="2">
              New onboarding experience <ArrowRightIcon />
            </Button>
            <Heading as="h1" size="9" align="center" className="tracking-tighter sm:text-[64px] leading-tight">
              <Box className="bg-gradient-to-tr bg-clip-text text-transparent 
                from-[#000000] from-70% via-[#00000066] to-[#00000066]
                dark:from-[#FFFFFF] dark:from-70% dark:via-[#FFFFFF66] dark:to-[#FFFFFF66] pb-1">
                Easiest way to <br /> power global teams.
              </Box>
            </Heading>
            <Text as="p" size="4" align="center" color="gray">
              Acme makes running global teams simple. HR, Payroll, International Employment,
              management and more.
            </Text>
            <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" align="center">
              <Button size="3" radius="full">Get Started</Button>
              <Button size="3" variant="outline" radius="full">
                See our plans <ArrowRightIcon />
              </Button>
            </Flex>
          </Flex>
        </Section>
      </Flex>
    </Flex>
  );
}
