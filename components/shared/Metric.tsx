import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface MetricProp {
    imgUrl: string;
    alt: string;
    title: string;
    href?: string;
    isAuthor?: boolean;
    textStyles?: string;
    value: number | string;
}

const Metric = ({
    imgUrl,
    value,
    title,
    alt,
    href,
    textStyles,
}: MetricProp) => {
    return (
        <div className="flex-center flex-wrap gap-1">
            <Image src={imgUrl} alt={alt} width={16} height={16} />

            <p className="small-medium flex items-center gap-1">
                <span className={`${textStyles} small-regular line-clamp-1`}>
                    {typeof value === "number" ? formatNumber(value) : value}
                </span>
                {title}
            </p>
        </div>
    );
};

export default Metric;
