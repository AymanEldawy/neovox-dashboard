// import { useEffect, useState } from "react";
// import {
//   AlertCircle,
//   ArrowLeft,
//   CheckCircle,
//   Mail,
//   Phone,
//   User,
//   Lock,
//   Save,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createEmployee, getEmployeeById, updateEmployee } from "@/services/employeesService.ts";
//
// interface Employee {
//   email: string;
//   phone: string;
//   firstName: string;
//   lastName: string;
//   password: string;
// }
//
// const AddEmployee = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id?: string }>();
//   const isEditMode = !!id;
//
//   const initialFormData: Employee = {
//     email: "",
//     phone: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//   };
//
//   const [formData, setFormData] = useState<Employee>(initialFormData);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     if (id && isEditMode) {
//       setLoading(true);
//       getEmployeeById(id)
//         .then((employee) => {
//           setFormData(employee.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch employee:", error);
//           setLoading(false);
//         });
//     }
//   }, [id, isEditMode]);
//
//   const handleCancel = () => {
//     navigate("/employees");
//   };
//
//   const handleInputChange = (field: keyof Employee, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (isEditMode) {
//         await updateEmployee(id!, formData);
//       } else {
//         await createEmployee(formData);
//       }
//       setShowSuccessDialog(true);
//     } catch (error) {
//       console.error("Failed to save employee:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleDialogConfirm = () => {
//     setShowSuccessDialog(false);
//     if (!isEditMode) {
//       setFormData(initialFormData);
//     }
//     navigate("/employees");
//   };
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center gap-4">
//               <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleCancel}>
//                 <ArrowLeft className="w-6 h-6" />
//               </button>
//               <div>
//                 <h1 className="text-4xl font-bold mb-2">{isEditMode ? "Edit Employee" : "Add New Employee"}</h1>
//                 <p className="text-purple-100">{isEditMode ? "Update employee details below" : "Enter details to add a new employee"}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {showSuccessDialog && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
//               <div className="flex items-center gap-3 mb-4">
//                 <CheckCircle className="w-6 h-6 text-green-600" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   {isEditMode ? "Employee Updated Successfully!" : "Employee Created Successfully!"}
//                 </h3>
//               </div>
//               <p className="text-gray-600 mb-6">
//                 Employee has been {isEditMode ? "updated" : "created"}. Click OK to continue.
//               </p>
//               <button
//                 onClick={handleDialogConfirm}
//                 className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:to-red-700 transition"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         )}
//
//         {loading && (
//           <div className="flex justify-center items-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//           </div>
//         )}
//
//         {!loading && (
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <User className="w-6 h-6 text-purple-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800">Employee Information</h2>
//             </div>
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                     <Mail className="w-5 h-5 text-purple-600" /> Email
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                     placeholder="e.g., employee@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                     <Phone className="w-5 h-5 text-purple-600" /> Phone
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                     placeholder="e.g., +1234567890"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                     <User className="w-5 h-5 text-purple-600" /> First Name
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                     placeholder="e.g., John"
//                   />
//                 </div>
//                 <div>
//                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                     <User className="w-5 h-5 text-purple-600" /> Last Name
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                     placeholder="e.g., Doe"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                   <Lock className="w-5 h-5 text-purple-600" /> Password
//                 </label>
//                 <input
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => handleInputChange("password", e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                   placeholder="Enter password"
//                 />
//               </div>
//               <div className="mt-6">
//               </div>
//             </div>
//             <div className="mt-8 space-y-3">
//               <button
//                 onClick={handleSubmit}
//                 type="button"
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <Save className="w-5 h-5" /> {isEditMode ? "Update Employee" : "Add Employee"}
//               </button>
//               <button
//                 type="button"
//                 className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </div>
//             <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mt-6">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-semibold text-purple-900 mb-1">Pro Tip 💡</p>
//                   <p className="text-xs text-purple-700">
//                     Ensure the email is unique and the password is secure to protect employee accounts.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default AddEmployee;
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Mail,
  Phone,
  User,
  Lock,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "@/services/employeesService.ts";

interface Employee {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
}

const AddEmployee = () => {
  const navigate = useNavigate();

  const initialFormData: Employee = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const [formData, setFormData] = useState<Employee>(initialFormData);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/employees");
  };

  const handleInputChange = (field: keyof Employee, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null); // Clear error message on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await createEmployee(formData);
      if (response.success) {
        setShowSuccessDialog(true);
      } else {
        setErrorMessage(response.message || "Failed to create employee. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save employee:", error);
      setErrorMessage("An error occurred while creating the employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogConfirm = () => {
    setShowSuccessDialog(false);
    setFormData(initialFormData);
    navigate("/employees");
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleCancel}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Add New Employee</h1>
                  <p className="text-purple-100">Enter details to add a new employee</p>
                </div>
              </div>
            </div>
          </div>

          {showSuccessDialog && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-800">Employee Created Successfully!</h3>
                  </div>
                  <p className="text-gray-600 mb-6">Employee has been created. Click OK to continue.</p>
                  <button
                      onClick={handleDialogConfirm}
                      className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:to-red-700 transition"
                  >
                    OK
                  </button>
                </div>
              </div>
          )}

          {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
          )}

          {!loading && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Employee Information</h2>
                </div>
                {errorMessage && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-900 mb-1">Error</p>
                          <p className="text-xs text-red-700">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                )}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Mail className="w-5 h-5 text-purple-600" /> Email
                      </label>
                      <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., employee@example.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Phone className="w-5 h-5 text-purple-600" /> Phone
                      </label>
                      <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., +1234567890"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <User className="w-5 h-5 text-purple-600" /> First Name
                      </label>
                      <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., John"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <User className="w-5 h-5 text-purple-600" /> Last Name
                      </label>
                      <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Lock className="w-5 h-5 text-purple-600" /> Password
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        placeholder="Enter password"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <button
                      onClick={handleSubmit}
                      type="button"
                      disabled={loading}
                      className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <Save className="w-5 h-5" /> Add Employee
                  </button>
                  <button
                      type="button"
                      className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
                      onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-purple-900 mb-1">Pro Tip 💡</p>
                      <p className="text-xs text-purple-700">
                        Ensure the email is unique and the password is secure to protect employee accounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default AddEmployee;