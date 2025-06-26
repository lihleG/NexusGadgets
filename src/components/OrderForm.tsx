import React, { useState } from "react";

const OrderForm = ({ onSubmit }: { onSubmit: (data:any) => void}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        city: "",
        postalCode: "",
        streetAddress: "",
        country: "",
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
};

return (
   <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg p-6 rounded-md space-y-4 max-w-xl mx-auto"
>
    <h2 className="text-lg font-semibold text-gray-800">Order Information</h2>
    <div className="grid grid-cols-2 gap-4">
        <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
        />
    </div>
    <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-500 transition"
    >
        Continue to Payment
    </button>
</form>


);
};

export default OrderForm;