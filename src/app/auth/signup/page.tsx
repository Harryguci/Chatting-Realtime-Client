"use client";

import React from "react";
import Link from "next/link";
import "../../_assets/scss/components/login/style.scss";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { server } from "@/config";
import Image from "next/image";
import guid from "guid";

const SignUp: React.FunctionComponent = () => {
  const router = useRouter();

  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repassword, setRePassword] = React.useState<string>("");
  const [agree, setAgree] = React.useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    const { data, status }: { status: number } = await axios
      .post(
        `${server}/api/auth/signup`,
        {
          id: guid.EMPTY,
          username,
          password,
          email,
          roles: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => response)
      .catch((error: any) => {
        var mess = error.response?.data.error || error.message;
        swal({
          title: "Error!",
          text: mess,
          icon: "error",
          buttons: ["Try again!"],
        });
      });

    if (status === 200) {
      swal({
        title: "Success!",
        text: "Sign Up sucessfully",
        icon: "success",
        buttons: ["Try again!"],
      });
      router.push("/auth/login");
    }
  };
  return (
    <React.Fragment>
      <div
        className=""
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <section className="signup" style={{ margin: "auto" }}>
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder="Repeat your password"
                      value={repassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="agree-term" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      I agree all statements in
                      <Link href="#" className="term-service">
                        Terms of service
                      </Link>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <Image
                    src="/signup-image.jpg"
                    alt="sing up image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    blurDataURL="/Harryguci-Logo-Primary-blur.png"
                    placeholder="blur"
                  />
                </figure>
                <Link
                  href="/auth/login"
                  className="signup-image-link btn bg-primary-gradient text-white"
                >
                  I am already member
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
