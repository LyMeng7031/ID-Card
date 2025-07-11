"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateIdPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    gender: "",
    job: "",
    cardType: "",
    platformIcon: "",
    platformUrl: "",
    linkUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  }

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(
      "ID Card created with data:\n" +
        JSON.stringify(formData, null, 2) +
        "\nSelected image: " +
        (selectedImage ? selectedImage.name : "No image selected")
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create your ID Card</CardTitle>
        <CardDescription>
          Fill in your details below to create a new ID card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* Name Fields */}
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            {/* Contact Fields */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            {/* Country Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <select id="country" name="country" value={formData.country} onChange={handleChange} required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Cambodia">Cambodia</option>
                <option value="United States">United States</option>
                <option value="Thailand">Thailand</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            {/* Gender */}
            <div className="grid gap-2">
              <Label>Gender</Label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
                  <span className="ml-1">Male</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
                  <span className="ml-1">Female</span>
                </label>
              </div>
            </div>

            {/* Job */}
            <div className="grid gap-2">
              <Label htmlFor="job">Job</Label>
              <Input id="job" name="job" value={formData.job} onChange={handleChange} placeholder="e.g., Developer" />
            </div>

            {/* Card Type */}
            <div className="grid gap-2">
              <Label htmlFor="cardType">Card Type</Label>
              <select id="cardType" name="cardType" value={formData.cardType} onChange={handleChange} required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Student">Student</option>
                <option value="Employee">Employee</option>
                <option value="Guest">Guest</option>
              </select>
            </div>

            {/* Platform Icon */}
            <div className="grid gap-2">
              <Label htmlFor="platformIcon">Platform</Label>
              <select id="platformIcon" name="platformIcon" value={formData.platformIcon} onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>

            {/* Platform URL */}
            <div className="grid gap-2">
              <Label htmlFor="platformUrl">Platform URL</Label>
              <Input
                id="platformUrl"
                name="platformUrl"
                type="url"
                placeholder="https://platform.com/yourprofile"
                value={formData.platformUrl}
                onChange={handleChange}
                pattern="https?://.+"
              />
            </div>

            {/* Link URL */}
            <div className="grid gap-2">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input
                id="linkUrl"
                name="linkUrl"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.linkUrl}
                onChange={handleChange}
                pattern="https?://.+"
              />
            </div>

            {/* Upload Image */}
            <div className="grid gap-2">
              <Label htmlFor="picture">Upload Picture</Label>
              <input
                id="picture"
                name="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer rounded border border-gray-300 p-2"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="mt-2 max-h-48 rounded border" />
              )}
            </div>

            <Button type="submit" className="w-full">
              Create ID Card
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
