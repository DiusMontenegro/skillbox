import Link from "next/link";
import React from "react";

interface Props {
    children: any;
    _id: string;
}

const Tag = ({ children, _id }: Props) => {
    return (
        <Link href={`/tags/${_id}`}>
            <div className="inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase text-white shadow hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                {children}
            </div>
        </Link>
    );
};

export default Tag;
