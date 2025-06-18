import { atom, useAtom } from "jotai";
import { useRef, useState, type ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
let password_match_atom = atom<boolean | null>(null);

export let usePasswordValdidation = () => {
  const [match, setMatch] = useAtom<boolean | null>(password_match_atom);
  return [match, setMatch] as const;
};
export default function PasswordInputs() {
  const [match, setMatch] = usePasswordValdidation();

  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPasswordRef.current?.value) {
      setMatch(e.target.value === confirmPasswordRef.current.value);
    } else {
      setMatch(null);
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (password) {
      setMatch(password === e.target.value);
    } else {
      setMatch(null);
    }
  };

  return (
    <>
      <div className="py-2 ">
        <p className="label block mb-2">Password</p>
        <div className="relative flex items-center join">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="password"
            name="password"
            className="input flex-1"
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="btn btn-soft btn-square  btn-glow btn-accent"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="py-2">
        <p className="label block mb-2">Confirm Password</p>
        <div className="relative items-center bg-red-200 flex join">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="confirm password"
            name="passwordConfirm"
            className="input flex-1 pr-10"
            ref={confirmPasswordRef}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type="button"
            className="btn btn-soft btn-square  btn-glow btn-accent"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {match !== null && !match && (
          <label className="fade text-error text-sm">
            password doesnt match
          </label>
        )}
        {match === true && (
          <label className="fade text-success text-sm">Passwords match</label>
        )}
      </div>
    </>
  );
}
