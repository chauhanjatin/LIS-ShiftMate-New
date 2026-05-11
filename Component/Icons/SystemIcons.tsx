import { cn } from "@/_helper/cn";

type IconProps = {
  className?: string;
};

export function PlusCircleIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-[1.1rem] w-[1.1rem]", className)}
    >
      <circle cx="10" cy="10" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 6.6V13.4M6.6 10H13.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        d="M5.1 10.2L8.1 13.2L14.9 6.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M5.6 7.9L10 12.3L14.4 7.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M12.4 4.9L7.2 10L12.4 15.1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M7.6 4.9L12.8 10L7.6 15.1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserCircleIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
    >
      <path
        d="M12 13.2C14.3196 13.2 16.2 11.3196 16.2 9C16.2 6.6804 14.3196 4.8 12 4.8C9.6804 4.8 7.8 6.6804 7.8 9C7.8 11.3196 9.6804 13.2 12 13.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.4 19.2C6.547 16.8447 9.0053 15.3 12 15.3C14.9947 15.3 17.453 16.8447 18.6 19.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.75 8.25L10.968 11.613C11.5715 12.0946 12.4285 12.0946 13.032 11.613L17.25 8.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <rect x="5.25" y="10.25" width="13.5" height="9.5" rx="2.75" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.75 10.25V8.5C8.75 6.70507 10.2051 5.25 12 5.25C13.7949 5.25 15.25 6.70507 15.25 8.5V10.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M2.75 12C4.69357 8.30376 8.14439 6 12 6C15.8556 6 19.3064 8.30376 21.25 12C19.3064 15.6962 15.8556 18 12 18C8.14439 18 4.69357 15.6962 2.75 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M3.75 3.75L20.25 20.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.64 6.16C11.0846 6.05572 11.5398 6 12 6C15.8556 6 19.3064 8.30376 21.25 12C20.4834 13.4581 19.435 14.7484 18.1748 15.7907"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1204 14.1204C13.5775 14.6633 12.8275 15 12 15C10.3431 15 9 13.6569 9 12C9 11.1725 9.33668 10.4225 9.87963 9.87963"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.10939 6.10938C4.73195 7.15462 3.58504 8.47195 2.75 12C4.69357 15.6962 8.14439 18 12 18C13.5288 18 14.994 17.6377 16.3043 16.9851"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M12 3.75L18.75 6.375V11.595C18.75 15.6464 16.0075 19.1884 12 20.25C7.99247 19.1884 5.25 15.6464 5.25 11.595V6.375L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 12.25L11.1 14.1L14.95 10.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
