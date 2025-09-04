import ErrorMessage from "@/components/shared/ErrorMessage";
import { useUserStore } from "@/store/userStore";
import type { UserLoginType } from "@/types/user.type";
import { useForm } from "react-hook-form"

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginType>({
    defaultValues: {
      username: "superadmin",
      password: "superpass"
    }
  });
  const login = useUserStore((state) => state.login);

  const onSubmit = async (data: UserLoginType) => {
    const response = await login(data)
    console.log(response);
    if (response.status === 401) {
      console.log(response, response.data);

    }

  }

  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-primary)]">Welcome to ParkSmart</h2>
          <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">Sign in to manage your parking</p>
        </div>
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <label className="sr-only" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="border block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors?.username ? <ErrorMessage title={errors.username.message || "username is required"} /> : null}
            </div>
            <div className="space-y-1.5">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="border block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors?.password ?
                <ErrorMessage title={errors.password.message || "password is required"} />
                : null}
            </div>
            <div>
              <button
                className="w-full rounded-lg bg-[var(--primary-color)] py-3 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
                type="submit">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login