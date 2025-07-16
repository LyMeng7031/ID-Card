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
    if (file) setSelectedImage(file);
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

  function getPlatformIconUrl(platform: string): string {
    switch (platform.toLowerCase()) {
      case "facebook":
        return "https://cdns-icons-png.flaticon.com/512/15047/15047435.png";
      case "tiktok":
        return "https://cdn-icons-png.flaticon.com/512/3046/3046121.png";
      case "instagram":
        return "https://cdn-icons-png.flaticon.com/512/1384/1384063.png";
      case "linkedin":
        return "https://cdn-icons-png.flaticon.com/512/1384/1384014.png";
      default:
        return "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData();
    form.append("first_name", formData.firstName);
    form.append("last_name", formData.lastName);
    form.append("email", formData.email);
    form.append("gender", formData.gender.toLowerCase());
    form.append("nationality", formData.country.toUpperCase());
    form.append("dob", "1995-06-15");
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("job", formData.job);
    form.append("card_type", formData.cardType);

    form.append(
      "social",
      JSON.stringify([
        {
          platform: formData.platformIcon.toLowerCase(),
          icon: getPlatformIconUrl(formData.platformIcon),
          url: formData.platformUrl,
        },
      ])
    );
    form.append("link_url", formData.linkUrl);
    if (selectedImage) form.append("picture", selectedImage);

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/v1/card/create-card`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: form,
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        let message = "";
        try {
          message = contentType.includes("json")
            ? (await response.json()).message
            : await response.text();
        } catch {
          message = "Unknown error occurred.";
        }
        alert("❌ Failed to create card: " + message);
        return;
      }

      const result = contentType.includes("json")
        ? await response.json()
        : await response.text();

      console.log("✅ Success:", result);
      alert("✅ ID Card created successfully!");
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Network error occurred.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe9f3] py-10 px-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-blue-800">
            Create Your Digital ID Card
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Provide your personal information to generate your custom ID card.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
                ["job", "Job"],
                ["address", "Address"],
              ].map(([name, label, type = "text"]) => (
                <div key={name}>
                  <Label htmlFor={name} className="text-sm text-gray-600">
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Country Select */}
            <div>
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Country</option>
                <option value="Cambodia">Cambodia</option>
                <option value="USA">USA</option>
                <option value="Thailand">Thailand</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <div className="flex gap-6 mt-2">
                {["Male", "Female"].map((g) => (
                  <label key={g} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Card Type */}
            <div>
              <Label htmlFor="cardType">Card Type</Label>
              <select
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Card Type</option>
                <option value="Minimal">Minimal</option>
                <option value="Student">Student</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <Label htmlFor="platformIcon">Social Platform</Label>
              <select
                id="platformIcon"
                name="platformIcon"
                value={formData.platformIcon}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Platform</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>

            {/* Platform URL and Link URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["platformUrl", "Platform URL"],
                ["linkUrl", "Link URL"],
              ].map(([name, label]) => (
                <div key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Upload Image */}
            <div>
              <Label htmlFor="picture">Upload Profile Picture</Label>
              <input
                type="file"
                name="picture"
                id="picture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mt-1 border p-2 rounded-md file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-3 w-full max-h-52 object-cover rounded-md shadow-md"
                />
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 transition-all duration-300 py-3 rounded-lg text-lg"
            >
               Create ID Card
            </Button>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
