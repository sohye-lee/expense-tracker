import { cn } from "@/lib/utils";

function H2({ content, className, rest }: { content: string; className?: string;  [key:string]: any }) {
  return (
      <h2 className={cn('text-2xl mb-3 text-[primary] text-blue-800 -leading-1 capitalize', className)} {...rest}>{content}</h2>
  )
}

export default H2