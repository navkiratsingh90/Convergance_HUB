import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"  // lowercase "button"
import { Separator } from "@/components/ui/separator"

function Login() {
  // State for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Handle change in inputs
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    // Call API here (login request)
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[var(--color-darkBlue)] p-4">
      <Card className="w-full bg-gray-800 border-0 max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-normal text-white">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="p-5 border-0 rounded-2xl bg-neutral-900"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="p-5 border-0 rounded-2xl bg-neutral-900"
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="text-sm underline cursor-pointer mb-2">forgot password</div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full rounded-3xl bg-[var(--color-lightBlue)]">
              Login
            </Button>

            <Separator className="my-2" />

            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
