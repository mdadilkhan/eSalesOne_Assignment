// components/InputField.jsx
const InputField = ({ label, type, name, value, onChange, error }) => {
    return (
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  };
  
  export default InputField;
  