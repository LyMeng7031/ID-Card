'use client';
import { useState } from 'react';
import { CameraIcon } from 'lucide-react';

const countries = [
  "Cambodia", "Thailand", "Vietnam", "Laos", "Singapore",
  "Malaysia", "Philippines", "Indonesia", "China", "Japan"
];

export default function IDCardForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    country: '',
    street: '',
    company: '',
    linkUrl: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [linkImage, setLinkImage] = useState<File | null>(null);
  const [linkPreview, setLinkPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLinkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLinkImage(file);
      setLinkPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${form.street}, ${form.country}`;
    console.log('Form submitted:', {
      ...form,
      fullAddress,
      profileImage,
      linkImage,
    });

    alert(`✅ ID Card Created:\n
Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nBirthday: ${form.birthday}\nCompany: ${form.company}\nURL: ${form.linkUrl}\nAddress: ${fullAddress}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Create ID Card</h1>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6">
          <label className="relative w-32 h-32 rounded-full border-4 border-indigo-500 cursor-pointer group overflow-hidden">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 group-hover:bg-gray-300">
                <CameraIcon className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600 mt-1">Upload</span>
              </div>
            )}
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'Birthday', name: 'birthday', type: 'date' },
            { label: 'Street Address', name: 'street' },
            { label: 'Company', name: 'company' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label className="block font-medium text-indigo-600">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          ))}

          {/* Country Dropdown */}
          <div>
            <label className="block font-medium text-indigo-600">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Link URL */}
          <div>
            <label className="block font-medium text-indigo-600">Link URL</label>
            <input
              type="url"
              name="linkUrl"
              value={form.linkUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Link Icon Upload */}
          <div>
            <label className="block font-medium text-indigo-600">Upload Link Icon (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLinkImageChange}
              className="block w-full text-sm text-gray-600"
            />
            {linkPreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Icon Preview:</p>
                <img src={linkPreview} alt="Icon" className="w-12 h-12 object-contain border rounded" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
