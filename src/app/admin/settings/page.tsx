'use client';

import { useState } from 'react';
import { Store, Phone, Mail, MapPin, Truck, Check, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'DELA BAGS',
    supportEmail: 'cielbags.service@gmail.com',
    supportPhone: '+91 84258 45342',
    whatsappNumber: '+91 99300 09639',
    address: 'Haji Chawl, Morland Road, Mumbai Central, Mumbai - 400008',
    businessHours: 'Mon - Sat: 9:00 AM - 9:00 PM',
    freeShippingThreshold: 1999,
    standardShippingFee: 99,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Store Settings</h2>
        <p className="text-muted-foreground text-sm">Manage store profile, contact numbers, address, and shipping fees.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm font-medium flex items-center gap-2">
          <Check className="h-4 w-4" /> Store settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Store Profile */}
        <div className="bg-white p-6 border rounded-md space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2 border-b pb-3">
            <Store className="h-4 w-4" /> General Store Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Store Brand Name</Label>
              <Input
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Support Email</Label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Support Phone Number</Label>
              <Input
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label>Store Physical Address</Label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Business Working Hours</Label>
            <Input
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Shipping & Delivery Settings */}
        <div className="bg-white p-6 border rounded-md space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2 border-b pb-3">
            <Truck className="h-4 w-4" /> Shipping & Delivery Rules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Free Shipping Minimum Amount (₹)</Label>
              <Input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label>Standard Flat Shipping Fee (₹)</Label>
              <Input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 font-bold gap-2">
            <Save className="h-4 w-4" /> SAVE SETTINGS
          </Button>
        </div>
      </form>
    </div>
  );
}
