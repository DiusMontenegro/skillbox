import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/search/Filter";
import { getAllUsers } from "@/lib/actions/user.action";
import { UserFilters } from "@/constants/filters";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
    const result = await getAllUsers({});
    const { users } = result;

    return (
        <>
            <div className="mx-auto flex w-full max-w-5xl flex-col-reverse justify-between gap-4 pt-36 sm:flex-row sm:items-center">
                <h1 className="text-xl font-bold">All Users</h1>
            </div>

            <div
                className={`mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center`}
            >
                <LocalSearch
                    route="/community"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search questions"
                />

                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[180px]"
                    containerClasses="flex"
                />
            </div>

            <section className="container mx-auto px-4 py-8">
                <article className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))}
                </article>
            </section>
        </>
    );
}
