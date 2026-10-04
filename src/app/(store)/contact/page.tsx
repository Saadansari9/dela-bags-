import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <div className="h-1 w-20 bg-black mx-auto mt-4 mb-4"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're here to help. Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border"
                placeholder="How can we help you?"
              />
            </div>
            <Button className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12">
              SEND MESSAGE
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-neutral-50 p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <MapPin className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Our Store / Office</h3>
                <p className="text-muted-foreground">Haji Chawl, Morland Road,<br />Mumbai Central, Mumbai - 400008, India</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Phone className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone / WhatsApp</h3>
                <p className="text-muted-foreground">Phone: +91 84258 45342<br />WhatsApp: +91 99300 09639</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Mail className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-muted-foreground">DELAbags.service@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Clock className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 9:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
