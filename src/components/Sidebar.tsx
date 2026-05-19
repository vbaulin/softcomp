import Link from "next/link";
import { siteMeta } from "@/lib/fallback-content";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="side-section">
        <h3>Follow Us On</h3>
        <ul className="social-list">
          {siteMeta.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="side-section">
        <h3>User Area</h3>
        <form className="stacked-form" action="/api/forms" method="post">
          <input type="hidden" name="form_type" value="login" />
          <label>
            Email
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" />
          </label>
          <label className="inline-field">
            <input name="remember" type="checkbox" /> Remember Me
          </label>
          <button type="submit">Login</button>
        </form>
        <p className="small-links">
          <Link href="/user-area/password-reset">Forgot your username/password?</Link>
          <Link href="/user-area/register">New registration</Link>
        </p>
      </section>

      <section className="side-section">
        <h3>Submit An Application</h3>
        <p>If you submit an application, you agree to our data protection policy.</p>
        <form action="/api/forms" method="post">
          <input type="hidden" name="form_type" value="application-intent" />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="side-section">
        <h3>Newsletters</h3>
        <p>Sign up now for more information about SoftComp.</p>
        <form className="stacked-form" action="/api/forms" method="post">
          <input type="hidden" name="form_type" value="newsletter" />
          <label className="honeypot">
            Please leave this field empty
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <label>
            E-mail *
            <input name="email" type="email" required />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </section>
    </aside>
  );
}

