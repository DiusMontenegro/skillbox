"use client";
import getQuestions from "@/lib/actions/question.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Test = () => {
    const { data, error, isFetched } = useQuery({
        queryKey: ["questions"],
        queryFn: getQuestions,
    });

    return <div></div>;
};

export default Test;
