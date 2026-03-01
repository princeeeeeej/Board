import Image from "next/image"

export const Loading = () => {
    return (
        <div className="flex flex-col h-full w-full justify-center items-center">
            <Image 
               src="/logo.svg"
               alt="Logo"
               width={50}
               height={50}
               className="animate-pulse duration-700"
            />
        </div>
    )}
