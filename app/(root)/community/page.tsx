import UserCard from "@/components/cards/UserCard";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/filters/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";

const CommunityPage = async () => {
  const results = await getAllUsers({});
  const { users } = results;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 max-sm:w-full">All Users</h1>

      <div className="mt-11 flex  items-center justify-between gap-5 max-sm:flex-row sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imageSource="/assets/icons/search.svg"
          placeholder="Search for amazing minds..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="flex min-h-[56px] sm:min-width-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResults
            title="users"
            description=" Join to be the first to break the silence! 🚀"
            link="/sign-up"
            linkTitle="Sign Up Now!"
          />
        )}
      </section>
    </>
  );
};

export default CommunityPage;
