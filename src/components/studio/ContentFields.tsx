import { Globe } from "lucide-react";
import type { Content } from "@/types/qr";

export default function ContentFields({
  value,
  onChange,
  error,
}: {
  value: Content;
  onChange: (patch: Partial<Content>) => void;
  error: string;
}) {
  const {
    type,
    url,
    text,
    ssid,
    password,
    security,
    hidden,
    email,
    subject,
    message,
  } = value;
  return (
    <div
      className="[&>input+label]:mt-4 [&>textarea+label]:mt-4"
      id="content-fields"
      role="tabpanel"
      aria-labelledby={`tab-${type}`}
    >
      {type === "url" && (
        <>
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="website"
          >
            Website address <span>URL</span>
          </label>
          <div className="relative [&>svg]:absolute [&>svg]:top-3.25 [&>svg]:left-3.25 [&>svg]:text-muted [&>input]:pl-9.75">
            <Globe size={17} />
            <input
              className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper px-3.25 py-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
              id="website"
              type="url"
              value={url}
              onChange={(e) => onChange({ url: e.target.value })}
              placeholder="https://your-website.com"
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby="content-error"
            />
          </div>
          <p className="mt-2.5 text-[10px] leading-[1.7] text-muted">
            Your next visitor is just a scan away.
          </p>
        </>
      )}
      {type === "text" && (
        <>
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="text"
          >
            Your message <span>{text.length.toLocaleString()} characters</span>
          </label>
          <textarea
            className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft max-h-62 min-h-18 resize-y"
            id="text"
            value={text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="A little note, your favorite quote, or anything you want to share…"
            maxLength={7000}
            rows={4}
          />
          <p className="mt-2.5 text-[10px] leading-[1.7] text-muted">
            Plain text, numbers, and emoji. Make it your own.
          </p>
        </>
      )}
      {type === "wifi" && (
        <>
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="ssid"
          >
            Network name
          </label>
          <input
            className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
            id="ssid"
            value={ssid}
            onChange={(e) => onChange({ ssid: e.target.value })}
            placeholder="Your Wi-Fi network"
            maxLength={128}
            autoComplete="off"
          />
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div>
              <label
                className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
                htmlFor="security"
              >
                Security
              </label>
              <select
                className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper px-2 py-3 text-[10px] leading-[1.4] text-ink placeholder:text-muted-soft"
                id="security"
                value={security}
                onChange={(e) => onChange({ security: e.target.value })}
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No password</option>
              </select>
            </div>
            {security !== "nopass" && (
              <div>
                <label
                  className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => onChange({ password: e.target.value })}
                  placeholder="Network password"
                  maxLength={128}
                />
              </div>
            )}
          </div>
          <label className="mt-4 flex items-center justify-start gap-1.5 text-[10px] [&>input]:accent-status">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => onChange({ hidden: e.target.checked })}
            />{" "}
            Hidden network
          </label>
          <p className="mt-2.5 text-[10px] leading-[1.7] text-muted">
            Anyone with this QR code can join your network.
          </p>
        </>
      )}
      {type === "email" && (
        <>
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="hello@example.com"
            maxLength={254}
            aria-invalid={!!error}
            aria-describedby="content-error"
          />
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="subject"
          >
            Subject <span>Optional</span>
          </label>
          <input
            className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft"
            id="subject"
            value={subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            placeholder="Let’s connect"
            maxLength={300}
          />
          <label
            className="mb-2.5 flex items-center justify-between text-[11px] [&>span]:text-[9px] [&>span]:text-muted"
            htmlFor="message"
          >
            Message <span>Optional</span>
          </label>
          <textarea
            className="block w-full min-w-0 rounded-[5px] border border-line-strong bg-paper p-3 text-xs leading-[1.4] text-ink placeholder:text-muted-soft max-h-62 min-h-18 resize-y"
            id="message"
            value={message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Start the conversation…"
            maxLength={3000}
            rows={2}
          />
        </>
      )}
      <p
        className="mt-2 text-[11px] leading-[1.6] text-danger empty:hidden"
        id="content-error"
        role="status"
      >
        {error}
      </p>
    </div>
  );
}
