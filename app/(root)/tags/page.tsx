import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/search/Filter";
import { UserFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";

export default async function Page() {
    const result = await getAllTags({});
    const { tags }: any = result;

    console.log(tags);

    return (
        <>
            <div className="mx-auto flex w-full max-w-5xl flex-col-reverse justify-between gap-4 pt-36 sm:flex-row sm:items-center">
                <h1 className="text-xl font-bold">All tags</h1>
            </div>

            <div className={`mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center`}>
                <LocalSearch
                    route="/tags"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for tags"
                />

                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[180px]"
                    containerClasses="flex"
                />
            </div>

            <section className="container mx-auto px-4 py-8">
                <article className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tags ? (
                        tags.map((tag: any) => (
                            <Link key={tag} href={`/tags/${tag._id}`} className="shadow-lg">
                                <article className="flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[250px]">
                                    <div className="w-fit rounded-sm px-5 py-1.5">
                                        <p className="font-semibold">{tag.name}</p>
                                    </div>

                                    <p className="mt-3.5">
                                        <span className="mr-2.5 font-semibold">
                                            {tag.questions.length} +
                                        </span>{" "}
                                        Questions
                                    </p>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <NoResult
                            title="No tags found"
                            description="it looks like there's no tags yet. Try asking a question"
                            link="/ask-question"
                            linkTitle="Ask a question"
                        />
                    )}
                </article>
            </section>
        </>
    );
}
