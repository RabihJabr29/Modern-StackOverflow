import TagCard from "@/components/cards/TagCard";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/filters/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";

const TagsPage = async () => {
  const results = await getAllTags({});

  const { tags } = results;
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 max-sm:w-full">All Tags</h1>

      <div className="mt-11 flex  items-center justify-between gap-5 max-sm:flex-row sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imageSource="/assets/icons/search.svg"
          placeholder="Search for interesting tags..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="flex min-h-[56px] sm:min-width-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResults
            title="tags"
            description="No tags yet &#128546; Ask a quesion to add a new tag ! 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default TagsPage;
