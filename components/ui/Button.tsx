import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200",
                primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-300 shadow-lg",
                destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-100",
                outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
                secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
                ghost: "hover:bg-slate-100/80 text-slate-600",
                link: "underline-offset-4 hover:underline text-indigo-600",
            },
            size: {
                default: "h-11 py-2 px-6",
                sm: "h-9 px-3 text-xs",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
