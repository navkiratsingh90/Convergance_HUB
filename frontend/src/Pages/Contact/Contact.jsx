import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, Phone, Mail } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-center p-10 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300/30 to-transparent"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Get in touch</h2>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Proin volutpat consequat porttitor cras nullam gravida at. Orci
            molestie a eu arcu. Sed ut tincidunt integer elementum id sem. 
            Arcu sed malesuada et magna.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Building2 className="w-6 h-6 text-blue-400" />
              <p className="text-gray-200">
                545 Mavis Island <br /> Chicago, IL 99191
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-400" />
              <p className="text-gray-200">+1 (555) 234-5678</p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-400" />
              <p className="text-gray-200">hello@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 bg-slate-950 flex items-center justify-center p-10">
        <form className="w-full max-w-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                First name
              </label>
              <Input placeholder="John" className="bg-slate-800 text-gray-100 border-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Last name
              </label>
              <Input placeholder="Doe" className="bg-slate-800 text-gray-100 border-gray-700" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-slate-800 text-gray-100 border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Phone number
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="bg-slate-800 text-gray-100 border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Message
            </label>
            <Textarea
              placeholder="Write your message..."
              className="bg-slate-800 text-gray-100 border-gray-700"
              rows={5}
            />
          </div>

          <div className="flex justify-end">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg px-6 py-2">
              Send message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
