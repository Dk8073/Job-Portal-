import axios from "axios";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const validateSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const { user, setUser, setIsLogIn } = useUser();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `http://localhost:8000/api/auth/signin`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log(response.data.user);
          setUser(response.data.user);
          setIsLogIn(true);
          toast.success("Login successfully", {
            style: {
              border: "1px solid blue",
              padding: "12px",
              color: "#155DFC",
            },
            iconTheme: {
              primary: "#155DFC",
              secondary: "#FFFAEE",
            },
          });
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <div className="w-full bg-white flex items-center justify-center px-4 py-6 md:py-8 lg:py-20">
          <div className="hidden lg:flex flex-col gap-8 pr-8">
            <div className="bg-[#1782d0] h-40 grid place-items-center rounded-2xl shadow-lg">
              <p className="text-white max-w-[15ch] text-xl font-semibold">
                Welcome, Back!
              </p>
            </div>
            <div className="bg-[#0b66c1] p-6 rounded-2xl shadow-lg">
              <p className="text-white text-xl font-semibold">
                Find the Right Job, Faster.
              </p>
            </div>
          </div>

          <Form className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-3 md:p-8 flex flex-col gap-6">
            <h1 className="text-4xl text-blue-700 font-semibold text-center">
              Login
            </h1>

            <div className="flex flex-col">
              <Field
                className="w-full py-3 px-4 border border-blue-500 rounded-lg outline-none placeholder:text-blue-600"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Field
                className="w-full py-3 px-4 border border-blue-500 rounded-lg outline-none placeholder:text-blue-600"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-40 mx-auto py-3 bg-blue-700 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-800 transition disabled:opacity-50 shadow-md"
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <Link className="mx-auto text-blue-700" to="/signup">
              Don't have a account?{" "}
              <span className="underline font-semibold">Signup</span>
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
