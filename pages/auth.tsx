import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../shared/helpers/supabaseClient";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn({ email });

    if (!error) {
      router.push("/users");
    } else {
      router.push("/reject");
    }
    console.log({ error });
  };

  return (
    <div className="bg-white border rounded-lg p-6 sm:p-12 w-4/5 sm:w-4/12 mx-auto my-48">
      <h3 className="font-extrabold text-3xl">Welcome</h3>

      <p className="text-gray-500 text-sm mt-4">
        {`Fill in your email, we'll send you a magic link.`}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          className="border w-full sm:p-3 rounded-lg mt-2 sm:mt-4 focus:border-primary-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary-500 text-white w-full p-3 rounded-lg mt-2 sm:mt-8 hover:bg-primary-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
