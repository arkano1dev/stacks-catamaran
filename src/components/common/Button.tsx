import React, { ReactElement, ReactNode } from "react";


const Button = ({ onClick, active, children }: { onClick: () => void; active: boolean; children: ReactNode }) => {

    return (
        <button
            className={`flex-1 flex items-center justify-center py-2 ${active ? "bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]" : ""
                }  rounded-2xl text-base font-normal`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
