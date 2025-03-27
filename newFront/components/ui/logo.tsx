import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  href?: string
}

export function Logo({ size = "md", href }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  const logoSize = sizes[size]

  const LogoImage = (
    <div className="relative inline-flex">
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary-text"
      >
        <path d="M20 80H80V70H60V50H80V40H60V20H40V40H20V50H40V70H20V80Z" fill="currentColor" />
      </svg>
    </div>
  )

  // Only wrap in Link if href is provided and we're not already inside a Link
  if (href) {
    return (
      <Link href={href} className="inline-block">
        {LogoImage}
      </Link>
    )
  }

  return LogoImage
}

