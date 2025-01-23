import { LANG } from "../utils/constants";
import { IResource } from "../utils/types";
import CollapseContainer from "./Accordion";
import GoThereLink from "./GoThereLink";

type ResourceCardProps = {
    resource: IResource
};

const ResourceCard = ({ resource }: ResourceCardProps) => {

    const tagsArray = resource.tags?.split(',') || [];

    return (
        <CollapseContainer text={resource.title} key={resource.id}>
            <div className="bg-gray-900 p-4 rounded-md shadow-md border border-gray-700 text-gray-200 flex flex-col gap-3">

                <div className="flex justify-between items-center">
                    <a 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex font-medium items-center text-blue-600 underline"
                    >
                        {LANG.EN.VISIT_RESOURCE}
                    </a>
                </div>
                <p className="text-sm my-2">
                    {resource.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tagsArray?.map((tag, index) => (
                        <span 
                            key={index} 
                            className="bg-gray-700 px-3 py-1 text-xs font-semibold rounded-full text-gray-300"
                        >
                            #{tag.trim()}
                        </span>
                    ))}
                </div>

                {resource.link && 
                <div className="flex justify-end">
                    <GoThereLink link={resource.link} linkText={LANG.EN.OPEN_EXTERNAL}/>
                </div> }

            </div>
        </CollapseContainer>
    );
}

export default ResourceCard;