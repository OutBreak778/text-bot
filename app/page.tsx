"use client";

import axios from "axios";
import { NextUIProvider, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Avatar,
  Link,
  AvatarIcon,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Switch,
  NavbarItem,
} from "@nextui-org/react";
import { LucideMoon, LucideSun } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const HandleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/chat`, { prompt }) // in package.json we should pass "type":"module"
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-2 purple-dark text-foreground bg-background">
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-2xl text-inherit text-left sm:text-center">
              OUTBREAK
            </p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button color="warning" variant="bordered">
                Contact Me
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <form onSubmit={HandleSubmit} className="mx-3 sm:mx-0 mb-72">
          <Card className="max-w-[325px] md:max-w-[475px] lg:max-w-[700px] border-2 border-gray-500 shadow-inner shadow-blue-100 rounded-md">
            <CardHeader className="flex gap-3">
              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
                }}
              />
              <div className="flex flex-col">
                <Link href="#" color="warning">
                  <p className="text-xl font-semibold leading-loose underline">
                    OpenAI Text Bot
                  </p>
                </Link>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <input
                type="text"
                value={prompt}
                placeholder="Enter your Text here..."
                className="bg-gray-200 appearance-none border rounded w-full p-2 text-gray-800 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                disabled={!prompt}
                type="submit"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 disabled:text-gray-300 text-white w-full mt-4 py-3 shadow-lg"
              >
                Submit
              </Button>
            </CardBody>
            <Divider className="my-4" />
            <CardBody className="bg-gray-200 mx-2 mb-2 sm:max-w-[275px] md:max-w-[425px] lg:max-w-[600px] rounded-md text-gray-800">
              {response}
            </CardBody>
          </Card>
        </form>
      </main>
    </NextUIProvider>
  );
}
