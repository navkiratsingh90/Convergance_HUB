import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  return (
    <div className="h-screen w-screen bg-white text-black">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-4 border-b">
        <div className="text-2xl font-bold">Relative</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#">Features</a>
          <a href="#">About us</a>
          <a href="#">Pricing</a>
          <a href="#">FAQ</a>
          <a href="#">Contacts</a>
        </nav>
        <div className="flex gap-2">
          <Button variant="ghost">Login</Button>
          <Button>Sign up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Say Goodbye to <br /> Task Overload
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Prioritize, automate, and stay ahead—AI simplifies your tasks so you can focus on what matters most.
        </p>
        <Button size="lg">Get started</Button>
      </section>

      {/* Kanban Preview */}
      <section className="px-6 md:px-20 pb-20">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Relative <span className="text-sm text-gray-500">/ task</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="kanban" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="sheets">Spreadsheets</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>

              {/* Kanban Columns */}
              <TabsContent value="kanban">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* To Do */}
                  <div>
                    <h3 className="font-semibold mb-2">To Do (3)</h3>
                    <Card className="p-3 mb-3">
                      <p className="font-medium">Main Flow Design</p>
                      <p className="text-sm text-gray-500">Design · Web</p>
                    </Card>
                    <Card className="p-3">
                      <p className="font-medium">Prototype</p>
                      <p className="text-sm text-gray-500">Design · Web</p>
                    </Card>
                  </div>

                  {/* In Progress */}
                  <div>
                    <h3 className="font-semibold mb-2">In Progress (2)</h3>
                    <Card className="p-3 mb-3">
                      <p className="font-medium">Preparing Infrastructure</p>
                      <p className="text-sm text-gray-500">Design · Product</p>
                    </Card>
                    <Card className="p-3">
                      <p className="font-medium">User Onboarding Design</p>
                      <p className="text-sm text-gray-500">Design · Product</p>
                    </Card>
                  </div>

                  {/* In Review */}
                  <div>
                    <h3 className="font-semibold mb-2">In Review (2)</h3>
                    <Card className="p-3 mb-3">
                      <p className="font-medium">User Flow</p>
                      <p className="text-sm text-gray-500">Design · Product</p>
                    </Card>
                    <Card className="p-3">
                      <p className="font-medium">Marketing Team Alignment</p>
                      <p className="text-sm text-gray-500">Marketing</p>
                    </Card>
                  </div>

                  {/* Completed */}
                  <div>
                    <h3 className="font-semibold mb-2">Completed (3)</h3>
                    <Card className="p-3 mb-3">
                      <p className="font-medium">Brand Guideline</p>
                      <p className="text-sm text-gray-500">Design · Branding</p>
                    </Card>
                    <Card className="p-3">
                      <p className="font-medium">Defining MVP</p>
                      <p className="text-sm text-gray-500">Product</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
