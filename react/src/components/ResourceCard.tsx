import { LANG } from "../utils/constants";
import { IResource } from "../utils/types";
import CollapseContainer from "./Accordion";
import GoThereLink from "./GoThereLink";

type ResourceCardProps = {
    resource: IResource
    onTag: (tag: string) => void
};

const ResourceCard = ({ resource, onTag }: ResourceCardProps) => {

    const tagsArray = resource.tags?.split(',') || [];

    return (
        <CollapseContainer text={resource.title} key={resource.id}>
            <div className="w-full text-gray-200 flex flex-col gap-3">

                <p className="text-sm my-2">
                    {resource.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tagsArray?.map((tag, index) => (
                        <span
                            key={index}
                            onClick={() => onTag(tag)}
                            className="bg-gray-700 px-3 py-1 text-xs font-semibold rounded-full text-gray-300"
                        >
                            #{tag.trim()}
                        </span>
                    ))}
                </div>

                {resource.link &&
                    <div className="flex justify-end mt-4">
                        <GoThereLink link={resource.link} linkText={LANG.EN.VISIT_RESOURCE} />
                    </div>}

            </div>
        </CollapseContainer>
    );
}

export default ResourceCard;