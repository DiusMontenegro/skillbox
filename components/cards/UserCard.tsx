import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";
import Tag from "../shared/sidebar/Tag";

interface Props {
    user: {
        _id: string;
        clerkId: string;
        picture: string;
        name: string;
        email: string;
    };
}

const UserCard = async ({ user }: Props) => {
    const { _id, clerkId, picture, name, email } = user;
    const tags = await getTopInteractedTags({ userId: _id });

    return (
        <Card className="w-full max-w-md overflow-hidden bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardContent className="flex h-full flex-col items-center justify-between p-6 text-center">
                <Link
                    href={`/profile/${clerkId}`}
                    className="group flex w-full flex-col items-center"
                >
                    <div className="relative mb-4 size-28">
                        <Image
                            src={picture}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="mb-2 line-clamp-1 text-lg font-semibold group-hover:underline">
                        {name}
                    </h3>
                    <p className="mb-4 line-clamp-1 flex flex-wrap text-xs text-muted-foreground">
                        <span>{email}</span>
                    </p>
                </Link>

                <div className="flex w-full flex-wrap justify-center gap-1">
                    {tags && tags.length > 0 ? (
                        tags.map((tag): any => (
                            <Tag key={tag._id} _id={_id}>
                                {tag.name}
                            </Tag>
                        ))
                    ) : (
                        <Badge>No tags yet.</Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UserCard;
