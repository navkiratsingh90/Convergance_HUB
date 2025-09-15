import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function PopupForm({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    portfolio: "",
    about: "",
    social: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data Submitted: ", formData)
    onOpenChange(false) // close after submit
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white rounded-2xl shadow-2xl border border-blue-800/40">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-400">
            ✨ Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800/80 text-white border border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 rounded-lg"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-800/80 text-white border border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 rounded-lg"
            />
          </div>

          {/* Portfolio */}
          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-gray-300">Portfolio Link</Label>
            <Input
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="bg-gray-800/80 text-white border border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 rounded-lg"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="about" className="text-gray-300">About</Label>
            <Textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="bg-gray-800/80 text-white border border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 rounded-lg min-h-[100px]"
            />
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <Label htmlFor="social" className="text-gray-300">Social Media</Label>
            <Input
              id="social"
              name="social"
              value={formData.social}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
              className="bg-gray-800/80 text-white border border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            💾 Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export default PopupForm